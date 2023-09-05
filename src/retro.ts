import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { retroListe } from './common/trelloRetroListe'

const sendImmediately = true

const startDate = dayjs('2023-09-05')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')
const currentWeekNumber = 36 + weeksSinceStart

const retroBoardLink = `https://trello.com/b/${retroListe[currentWeekNumber % retroListe.length]}`
const webhookUrl = process.env.FLEXINTERNAL_WEBHOOK!

const blocks = [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:speaking_head_in_silhouette: :speech_balloon: Husk retro idag. Sjekk om du har tilgang til retro boardet <${retroBoardLink}|her>.`,
        },
    },
]

if (sendImmediately || currentWeekNumber % 4 === 0) {
    await sendSlackMessage(webhookUrl, { blocks })
}
