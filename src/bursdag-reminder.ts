import dayjs from 'dayjs'

import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'
import { bursdagsbarna } from './common/teammedlemmer'

const dagensDato = dayjs().format('MM-DD')

const dagensBursdager = bursdagsbarna.filter((member) => member.bursdag === dagensDato)

if (dagensBursdager.length > 0) {
    const melding = dagensBursdager
        .map(
            (member) =>
                `:alphabet-white-g::alphabet-white-r::alphabet-white-a::alphabet-white-t::alphabet-white-u::alphabet-white-l::alphabet-white-e::alphabet-white-r::alphabet-white-e::alphabet-white-r: :alphabet-white-m::alphabet-white-e::alphabet-white-d: :alphabet-white-d::alphabet-white-a::alphabet-white-g::alphabet-white-e::alphabet-white-n: ${member.initialer}! 🎉🎂`,
        )
        .join('\n')

    await slackWebClient.chat.postMessage({
        channel: flexInternal(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: melding,
                },
            },
        ],
        icon_emoji: ':birthday-fluff:',
        username: 'Bursdagsliste',
        text: 'Bursdagspåminnelse',
    })
}
