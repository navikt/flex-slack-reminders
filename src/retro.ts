import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { retroListe } from './common/trelloRetroListe'

const startDate = dayjs('2023-09-29')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')
const currentWeekNumber = 39 + weeksSinceStart

const retroBoardLink = `https://trello.com/b/${retroListe[currentWeekNumber % retroListe.length]}`

console.log(`Retro board er: ${retroBoardLink}`)
const blocks = [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:speaking_head_in_silhouette: :speech_balloon: Husk retro idag. Sjekk om du har tilgang til retro boardet <${retroBoardLink}|her>.`,
        },
    },
]

const ukeAdjustment = 1

if ((currentWeekNumber + ukeAdjustment) % 4 === 0) {
    console.log('Tid for retro')
    await sendSlackMessage('FLEXINTERNAL_WEBHOOK', { blocks })
} else {
    console.log(`Ikke tid for retro fordi ukenummer pluss ${ukeAdjustment} ikke er delelig med 4`)
}
