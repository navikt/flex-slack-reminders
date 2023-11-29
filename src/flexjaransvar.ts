import './common/configInit'

import { flexjaransvarlig } from './common/flexjaransvarlig'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

const ansvarlig = flexjaransvarlig()
console.log(`Ansvarlig er ${ansvarlig.initialer}`)

// eslint-disable-next-line
const blocks = [] as any[]

blocks.push(
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `Det er <@${ansvarlig.memberId}> som har flexjar ansvar denne uka.`,
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

await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks,
    icon_emoji: ':prinsipp_brukers_situasjon:',
    username: 'Flexjar ansvar denne uka',
    text: 'Ukens flexjaransvar',
})
