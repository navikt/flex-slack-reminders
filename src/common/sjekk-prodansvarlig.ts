import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse'

import { flexProdansvar } from './slackChannels'
import { slackWebClient } from './slackClient'
import { hentProdansvarlig } from './prodansvarlig'

export const finnSisteMeldingFraSlackbot = async (botUserId: string): Promise<MessageElement | undefined> => {
    try {
        const channel = flexProdansvar()
        const response = await slackWebClient.conversations.history({
            channel,
            limit: 10,
        })

        if (response.messages) {
            const meldingerFraBot = response.messages.filter((melding) => melding.user === botUserId)

            if (meldingerFraBot.length > 0) {
                return meldingerFraBot.reduce(
                    (latest, current) =>
                        parseFloat(current.ts ?? '0') > parseFloat(latest.ts ?? '0') ? current : latest,
                    meldingerFraBot[0],
                )
            }
        }
        return undefined
    } catch (error) {
        console.error(`Klarte ikke hente meldinger fra kanal ${flexProdansvar()}:`, error)
        return undefined
    }
}

export const masPaaProdansvarlig = async (melding: MessageElement): Promise<void> => {
    try {
        await slackWebClient.chat.postMessage({
            channel: flexProdansvar(),
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Har du husket å gjøre dine oppgaver i dag <@${hentProdansvarlig().memberId}>?
                        Husk å reagere med ✅ når du har gått gjennom dagens oppgaver`,
                    },
                },
            ],
            icon_emoji: ':male-police-officer:',
            username: 'Dagens prodansvar',
            text: 'Husk prodansvar',
            thread_ts: melding.ts,
        })
    } catch (error) {
        console.error('Klarte ikke sende melding:', error)
    }
}
