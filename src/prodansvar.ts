import './common/configInit'

import { dagTekst, prodansvarlig } from './common/prodansvarlig'
import { slackWebClient } from './common/slackClient'
import { flexProdansvar } from './common/slackChannels'

const ansvarlig = prodansvarlig()

const hovedpost = await slackWebClient.chat.postMessage({
    channel: flexProdansvar(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Det er <@${ansvarlig.memberId}> som har prodansvar denne uka. Dagens oppgaver finnes i tråd :thread:`,
            },
        },
    ],
    icon_emoji: ':male-police-officer:',
    username: 'Dagens prodansvar',
    text: 'Dagens prodansvar',
})

await slackWebClient.chat.postMessage({
    channel: flexProdansvar(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: dagTekst(),
            },
        },
    ],
    icon_emoji: ':male-police-officer:',
    username: 'Dagens prodansvar',
    text: 'Instruksjoner',
    thread_ts: hovedpost.ts,
})
