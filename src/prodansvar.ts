import './common/configInit'

import { prodansvarlig } from './common/prodansvarlig'
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
                text: `Det er <@${ansvarlig.memberId}> som har prodansvar denne uka.`,
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
                text: `:link: *Nyttige lenker*
<https://logs.adeo.no/goto/85280c10-59cf-11ed-8607-d590fd125f80|Logger flex namespace>
<https://grafana.nav.cloud.nais.io/d/H8jR8MFGk/flex-kafka-lag?orgId=1&refresh=5m&from=now-26h&to=now&var-datasource=prod-gcp|Flex kafka lag dashboardet>
<https://grafana.nav.cloud.nais.io/d/AdtqLupWk/flex-funksjonell?from=now-24h&to=now|Flex funksjonell>
<https://grafana.nav.cloud.nais.io/d/AVwFIm0Mz/cloudsql-gcp?orgId=1&var-datasource=prod-gcp-stackdriver&var-project=flex-prod-af40|CloudSQL - GCP>
<https://github.com/orgs/navikt/security/alerts/code-scanning?query=is:open%20team:flex|Code QL funn>
<https://grafana.nav.cloud.nais.io/d/CK_g1AWIk/flex-app-oversikt?orgId=1&var-datasource=prod-gcp&var-namespace=flex&var-app=All&var-environment=prod|Flex apper oversikt>
<https://github.com/orgs/navikt/security/alerts/dependabot?q=is:open%20team:flex|Github sårbarheter>`,
            },
        },
    ],
    icon_emoji: ':male-police-officer:',
    username: 'Dagens prodansvar',
    text: 'Instruksjoner',
    thread_ts: hovedpost.ts,
})
