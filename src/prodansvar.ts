import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'

const prodansvarlige = [
    { initialer: 'HSA', memberId: 'UPU6U4H9R' },
    { initialer: 'BIK', memberId: 'UMWEVMRM4' },
    { initialer: 'NJM', memberId: 'U02AM04QV96' },
    { initialer: 'ØK', memberId: 'U021UJDDMHB' },
    { initialer: 'GB', memberId: 'U0124V94CLR' },
]

const startDate = dayjs('2023-08-07')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')

const ansvarligIndex = weeksSinceStart % prodansvarlige.length // Bruker modulo for å rotere
const ansvarlig = prodansvarlige[ansvarligIndex]
console.log(`Ansvarlig er ${ansvarlig.initialer}`)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks = [] as any[]

blocks.push({
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: `:male-police-officer: *Prodansvar denne uka*
Det er <@${ansvarlig.memberId}> som har prodansvar denne uka.`,
    },
})

await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
