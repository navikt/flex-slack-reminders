import './common/configInit'

import { sendSlackMessage } from './common/slackPosting'
import { prodansvarlig } from './common/prodansvarlig'

const ansvarlig = prodansvarlig()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks = [] as any[]

blocks.push(
    {
        type: 'divider',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:male-police-officer: *Prodansvar denne uka*
Det er <@${ansvarlig.memberId}> som har prodansvar denne uka.`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:link: *Nyttige lenker*
<https://logs.adeo.no/goto/85280c10-59cf-11ed-8607-d590fd125f80|Logger flex namespace>
<https://grafana.nais.io/d/H8jR8MFGk/flex-kafka-lag?orgId=1&refresh=5m&from=now-26h&to=now&var-datasource=prod-gcp|Flex kafka lag dashboardet>
<https://grafana.nais.io/d/AdtqLupWk/flex-funksjonell?from=now-24h&to=now|Flex funksjonell>
<https://grafana.nais.io/d/AVwFIm0Mz/cloudsql-gcp?orgId=1&var-datasource=prod-gcp-stackdriver&var-project=nais-prod|CloudSQL - GCP>
<https://github.com/orgs/navikt/security/alerts/code-scanning?query=is:open%20team:flex|Code QL funn>
<https://grafana.nais.io/d/CK_g1AWIk/flex-app-oversikt?orgId=1&var-datasource=prod-gcp&var-namespace=flex&var-app=All&var-environment=prod|Flex apper oversikt>
<https://github.com/orgs/navikt/security/alerts/dependabot?q=is:open%20team:flex|Github sårbarheter>`,
        },
    },
)

await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
