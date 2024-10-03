import './common/configInit'

import { dagTekst } from './common/prodansvarlig'
import { slackWebClient } from './common/slackClient'
import { flexProdansvar } from './common/slackChannels'

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
    text: 'Dagens prodansvar',
})
