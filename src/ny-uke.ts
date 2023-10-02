import './common/configInit'
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'

import { sendSlackMessage } from './common/slackPosting'
import { prodansvarlig } from './common/prodansvarlig'
import { flexjaransvarlig } from './common/flexjaransvarlig'

dayjs.extend(weekOfYear)

dayjs('2018-06-27').week() // 26

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks = [] as any[]

blocks.push(
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
            text: `:male-police-officer: OKR Boardet finner vi her <https://flex-docs.ekstern.dev.nav.no/okr-board|OKR Board>`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:male-police-officer: Det er <@${prodansvarlig().memberId}> som har prodansvar hele denne uka.`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `På fredag har  <@${flexjaransvarlig().memberId}> flexjaransvar.`,
        },
    },
)

await sendSlackMessage('FLEXINTERNAL_WEBHOOK', { blocks })
