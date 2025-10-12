import dayjs from './common/util/dayjs-config'
import './common/configInit'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

if (dayjs().week() % 2 !== 0) {
    await slackWebClient.chat.postMessage({
        channel: flexInternal(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `:calendar: Det er uke ${dayjs().week()} og :alphabet-white-f::alphabet-white-r::alphabet-white-i::alphabet-white-d::alphabet-white-a::alphabet-white-y:  :alphabet-white-w::alphabet-white-i::alphabet-white-n::alphabet-white-s:!`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Har du noe har lyst til å vise frem? Noe du har tegnet, laget eller kodet? Noen tall eller grafer? Da er det helt sikkert lurt å begynne å forberede det allerede nå!`,
                },
            },
        ],
        icon_emoji: ':taco:',
        username: 'Friday Wins',
        text: 'Husk Friday Wins',
    })
}
