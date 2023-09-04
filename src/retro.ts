import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { retroListe } from './common/trelloRetroListe'

const startDate = dayjs('2023-09-04').startOf('week')
const currentDate = dayjs()
const weeksSinceStart = currentDate.diff(startDate, 'week')

const retroBoardLink = `https://trello.com/b/${retroListe[weeksSinceStart % retroListe.length]}`

const isFriday = currentDate.day() === 5
const currentHour = currentDate.hour()

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

// Check if the current day is Friday, the current hour is 09, and it has been 4 weeks since the start date
if (isFriday && currentHour === 9 && weeksSinceStart % 4 === 0) {
    await sendSlackMessage(webhookUrl, { blocks })
}
