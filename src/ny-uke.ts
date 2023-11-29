import './common/configInit'
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'

import { prodansvarlig } from './common/prodansvarlig'
import { flexjaransvarlig } from './common/flexjaransvarlig'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

dayjs.extend(weekOfYear)

dayjs('2018-06-27').week() // 26

await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:wave: Det er ukenummer ${dayjs().week()} `,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `OKR Boardet finner vi her <https://flex-docs.ekstern.dev.nav.no/okr-board|OKR Board>`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Det er <@${prodansvarlig().memberId}> som har prodansvar hele denne uka.`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `På fredag har <@${flexjaransvarlig().memberId}> flexjaransvar.`,
            },
        },
    ],
    icon_emoji: ':godstolen:',
    username: 'Ny uke for Team Flex',
    text: 'Ny uke',
})
