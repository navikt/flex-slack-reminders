import './common/configInit'
import * as dayjs from 'dayjs'

import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

const startDate = dayjs('2023-10-11')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')
const currentWeekNumber = 41 + weeksSinceStart

const retroRapportLink = `https://flex-docs.ekstern.dev.nav.no/retro-board/retro-uke-${currentWeekNumber}---${
    currentWeekNumber + 1
}--${dayjs().year()}`

const ukeAdjustment = 1

if ((currentWeekNumber + ukeAdjustment) % 2 === 0) {
    console.log('retro rapport')
    await slackWebClient.chat.postMessage({
        channel: flexInternal(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: ` dette ble diskutert i <${retroRapportLink}|retro>${dayjs()}.`,
                },
            },
        ],
        icon_emoji: ':writing_hand: :page_with_curl:',
        username: 'CodeQL alerts',
        text: 'CodeQL',
    })
} else {
    console.log(`Ikke tid for retro rapportering fordi ukenummer pluss ${ukeAdjustment} ikke er delelig med 2`)
}
