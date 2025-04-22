import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { Bot } from '@slack/web-api/dist/types/response/BotsInfoResponse'
import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse'

import { sjekkProdAnsvar } from '../sjekk-prodansvar'

import { flexProdansvar } from './slackChannels'
import { slackWebClient } from './slackClient'
import { finnSisteMeldingFraSlackbot, masPaaProdansvarlig } from './sjekk-prodansvarlig'
import * as sjekkProdansvarligModule from './sjekk-prodansvarlig'
import { hentProdansvarlig } from './prodansvarlig'

vi.mock('./slackClient', () => ({
    slackWebClient: {
        conversations: {
            history: vi.fn(),
        },
        chat: {
            postMessage: vi.fn(),
        },
        bots: {
            info: vi.fn(),
        },
    },
}))

vi.mock('./slackChannels', () => ({
    flexProdansvar: vi.fn(),
}))

vi.mock('./prodansvarlig', () => ({
    hentProdansvarlig: vi.fn(),
}))

describe('finnSisteMeldingFraSlackbot', () => {
    const mockedBot = 'U12345'

    beforeEach(() => {
        vi.resetAllMocks()
        ;(flexProdansvar as Mock).mockReturnValue('C12345')
    })

    it('finner siste melding fra slackBot', async () => {
        const messages: MessageElement[] = [
            { ts: '1611234567.000100', user: 'U12345', text: 'Test message 1' },
            { ts: '1611234568.000200', user: 'U12345', text: 'Test message 2' },
        ]

        ;(slackWebClient.conversations.history as Mock).mockResolvedValue({
            messages,
        })

        const result = await finnSisteMeldingFraSlackbot(mockedBot)

        expect(result?.ts).toBe('1611234568.000200')
    })

    it('finner ikke melding fra slackBot, returnerer undefined', async () => {
        const messages: MessageElement[] = [
            { ts: '1611234567.000100', user: 'U99999', text: 'Message from another user' },
        ]

        ;(slackWebClient.conversations.history as Mock).mockResolvedValue({
            messages,
        })

        const result = await finnSisteMeldingFraSlackbot(mockedBot)

        expect(result).toBeUndefined()
    })

    it('returnerer undefined om APIet feiler', async () => {
        ;(slackWebClient.conversations.history as Mock).mockRejectedValue(new Error('API Error'))

        const result = await finnSisteMeldingFraSlackbot(mockedBot)

        expect(result).toBeUndefined()
    })
})

describe('masPaaProdansvarlig', () => {
    const message: MessageElement = {
        ts: '1611234567.000100',
        user: 'U12345',
        text: 'Test message',
        thread_ts: '1611234567.000100',
    }

    beforeEach(() => {
        vi.resetAllMocks()
        ;(hentProdansvarlig as Mock).mockReturnValue({ memberId: 'U56789' })
        ;(flexProdansvar as Mock).mockReturnValue('C12345')
    })

    it('sender påminnelse til prodansvarlig', async () => {
        ;(slackWebClient.chat.postMessage as Mock).mockResolvedValue({ ok: true })

        await masPaaProdansvarlig(message)

        expect(slackWebClient.chat.postMessage).toHaveBeenCalledWith({
            channel: 'C12345',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Har du husket å gjøre dine oppgaver i dag <@U56789>?
                        Husk å reagere med ✅ når du har gått gjennom dagens oppgaver`,
                    },
                },
            ],
            icon_emoji: ':male-police-officer:',
            username: 'Dagens prodansvar',
            text: 'Husk prodansvar',
            thread_ts: message.thread_ts,
        })
    })

    it('Logger feilmelding om meldingen feiler', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        ;(slackWebClient.chat.postMessage as Mock).mockRejectedValue(new Error('Failed to send message'))

        await masPaaProdansvarlig(message)

        expect(consoleSpy).toHaveBeenCalledWith('Klarte ikke sende melding:', new Error('Failed to send message'))
        consoleSpy.mockRestore()
    })
})

describe('sjekkProdansvar', () => {
    const mockedBot: Bot = {
        id: 'B12345',
        name: 'Dagens prodansvar',
        user_id: 'U12345',
        deleted: false,
        updated: 0,
        app_id: 'A12345',
    }

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('kaller masPaaProdansvarlig dersom siste meldingen ikke har noen reaksjon', async () => {
        const slackBotId = 'B05NWMF3Q64'
        const meldingUtenReaksjon: MessageElement = {
            ts: '1611234567.000100',
            user: slackBotId,
            text: 'Test message',
            reactions: [],
            thread_ts: '1611234567.000100',
        }

        ;(slackWebClient.bots.info as Mock).mockResolvedValue({ bot: mockedBot })
        ;(slackWebClient.conversations.history as Mock).mockResolvedValue({
            messages: [meldingUtenReaksjon],
        })

        const masPaaProdansvarligSpy = vi.spyOn(sjekkProdansvarligModule, 'masPaaProdansvarlig')

        await sjekkProdAnsvar()

        expect(masPaaProdansvarligSpy).toHaveBeenCalledWith(meldingUtenReaksjon)

        masPaaProdansvarligSpy.mockRestore()
    })

    it('kaller ikke på masPaaProdansvarlig dersom siste meldingen har reaksjon', async () => {
        const meldingMedReaksjon: MessageElement = {
            ts: '1611234567.000200',
            user: 'U12345',
            text: 'Test message with reactions',
            reactions: [{ name: 'thumbsup', users: ['U67890'], count: 1 }],
            thread_ts: '1611234567.000200',
        }

        ;(slackWebClient.bots.info as Mock).mockResolvedValue({ bot: mockedBot })
        ;(slackWebClient.conversations.history as Mock).mockResolvedValue({
            messages: [meldingMedReaksjon],
        })

        const masPaaProdansvarligSpy = vi
            .spyOn(sjekkProdansvarligModule, 'masPaaProdansvarlig')
            .mockImplementation(() => Promise.resolve())

        await sjekkProdAnsvar()

        expect(masPaaProdansvarligSpy).not.toHaveBeenCalled()
        masPaaProdansvarligSpy.mockRestore()
    })
})
