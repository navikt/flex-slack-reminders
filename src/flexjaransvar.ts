import './common/configInit'

import { flexjaransvarlig } from './common/flexjaransvarlig'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

const ansvarlig = flexjaransvarlig()
console.log(`Ansvarlig er ${ansvarlig.initialer}`)

const hovedpost = await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Det er <@${ansvarlig.memberId}> som har flexjar ansvar denne uka.`,
            },
        },
    ],
    icon_emoji: ':prinsipp_brukers_situasjon:',
    username: 'Flexjar ansvar denne uka',
    text: 'Ukens flexjaransvar',
})

await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Teamet har et rullerende flexjaransvar blant alle medlemmene. Ansvaret er å fjerne siste ukes feedback med personopplysninger.
\n\nMan inkluderer da forrige fredag, lørdag og søndag i sin uke.`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:link: *Nyttige lenker*
<https://flexjar.ansatt.nav.no/|Flexjar>`,
            },
        },
    ],
    icon_emoji: ':flexjar:',
    username: 'Flexjar ansvar denne uka',
    text: 'Instruksjoner',
    thread_ts: hovedpost.ts,
})
