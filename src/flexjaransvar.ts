import './common/configInit'

import { sendSlackMessage } from './common/slackPosting'
import { flexjaransvarlig } from './common/flexjaransvarlig'

const ansvarlig = flexjaransvarlig()
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

await sendSlackMessage('FLEXINTERNAL_WEBHOOK', { blocks })
