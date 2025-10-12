import './common/configInit'
import dayjs from './common/util/dayjs-config'
import { numberToSlackEmoji } from './common/numberToEmoji'
import { hentTrellokort } from './common/trelloApi'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

const maxDager = 120

const trellokort = await hentTrellokort()
const gamle = trellokort.filter((trello) => dayjs().diff(dayjs(trello.dateLastActivity), 'day') > maxDager)
console.log(`Fant ${gamle.length} gamle trellokort`)
if (gamle.length > 0) {
    const hovedpost = await slackWebClient.chat.postMessage({
        channel: flexInternal(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Vi har ${gamle.length} trellokort uten aktivitet de siste  ${maxDager} dagene.
Vurder lukking eller snoozing av disse kortene.`,
                },
            },
        ],
        icon_emoji: ':trello:',
        username: 'Trellotavla',
        text: 'Pullrequests',
    })

    gamle.map(async (pull, idx) => {
        await slackWebClient.chat.postMessage({
            channel: flexInternal(),
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${numberToSlackEmoji(idx + 1)} *<${pull.shortUrl}|${pull.name}>*`,
                    },
                },
            ],
            icon_emoji: ':trello:',
            username: 'Trellotavla',
            text: 'Pullrequests',
            thread_ts: hovedpost.ts,
        })
    })
}
