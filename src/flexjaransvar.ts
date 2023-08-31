import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { flexjaransvarlige } from './common/teammedlemmer'

const startDate = dayjs('2023-06-03').startOf('week')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')

const ansvarligIndex = weeksSinceStart % flexjaransvarlige.length // Bruker modulo for å rotere
const ansvarlig = flexjaransvarlige[ansvarligIndex]
console.log(`Ansvarlig er ${ansvarlig.initialer}`)

// eslint-disable-next-line
const blocks = [] as any[]

blocks.push(
    {
        type: 'divider',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:male-police-officer: *Flexjar ansvar denne uka*
Det er <@${ansvarlig.memberId}> som har flexjar ansvar denne uka.`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `Teamet har et rullerende flexjaransvar blant alle medlemmene. Ansvaret er å fjerne siste ukes feedback med personopplysninger. Man skal også poste en kurert post på fredager i #flex-innsikt
\n\nMan inkluderer da forrige fredag, lørdag og søndag i sin uke.`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:link: *Nyttige lenker*
<https://flexjar.intern.nav.no/|Flexjar>`,
        },
    },
)

await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
