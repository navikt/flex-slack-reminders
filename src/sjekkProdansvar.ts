import './common/configInit'

import { MessageElement } from '@slack/web-api/dist/types/response/ConversationsHistoryResponse'
import { BotsInfoResponse } from '@slack/web-api'

import { slackWebClient } from './common/slackClient'
import { flexProdansvar } from './common/slackChannels'
import { hentProdansvarlig } from './common/prodansvarlig'

const finnSisteMeldingFraSlackbot = async (slackBot: BotsInfoResponse): Promise<MessageElement | undefined> => {
    try {
        const response = await slackWebClient.conversations.history({
            channel: flexProdansvar(),
            limit: 10,
        })

        if (response.messages) {
            // Filter messages by the user ID and sort by timestamp to find the latest
            const meldingerFraBot = response.messages.filter((melding) => melding.user === slackBot.bot?.user_id)

            if (meldingerFraBot.length > 0) {
                meldingerFraBot.sort((a, b) => parseFloat(<string>b.ts) - parseFloat(<string>a.ts))
                return meldingerFraBot[0]
            }
        }
        return undefined
    } catch (error) {
        console.error('Error fetching message history:', error)
        return undefined
    }
}

const masPaaProdansvarlig = async (melding: MessageElement): Promise<void> => {
    await slackWebClient.chat.postMessage({
        channel: flexProdansvar(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Har du husket å gjøre dine oppgaver i dag <@${hentProdansvarlig().memberId}>`,
                },
            },
        ],
        icon_emoji: ':male-police-officer:',
        username: 'Dagens prodansvar',
        text: 'Husk prodansvar',
        thread_ts: melding.thread_ts,
    })
}

const slackBot = await slackWebClient.bots.info()
const sisteMelding = await finnSisteMeldingFraSlackbot(slackBot)

//Ingen reaksjon på prodansvar-melding sender ut påminnelse
if (sisteMelding && sisteMelding.reactions && sisteMelding.reactions.length == 0) {
    await masPaaProdansvarlig(sisteMelding)
}
