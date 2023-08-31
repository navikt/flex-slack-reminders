import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { prodansvarlige } from './common/teammedlemmer'

const startDate = dayjs('2023-08-07')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')

const ansvarligIndex = weeksSinceStart % prodansvarlige.length // Bruker modulo for å rotere
const ansvarlig = prodansvarlige[ansvarligIndex]
console.log(`Ansvarlig er ${ansvarlig.initialer}`)

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
<https://grafana.nais.io/d/AdtqLupWk/spoknad-funksjonell?orgId=1&from=now-1d%2Fd&to=now-1d%2Fd&refresh=1m&var-datasource=prod-gcp&var-namespace=All|Spøknad funksjonell>
<https://grafana.nais.io/d/AVwFIm0Mz/cloudsql-gcp?orgId=1&var-datasource=prod-gcp-stackdriver&var-project=nais-prod|CloudSQL - GCP>
<https://github.com/orgs/navikt/security/alerts/dependabot?q=is:open%20team:flex|Github sårbarheter>`,
        },
    },
)

await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
