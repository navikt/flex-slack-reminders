import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'

dayjs.extend(weekOfYear)

await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:calendar: Det er onsdag i uke ${dayjs().week()}. Det er en oddtallsuke, noe som betyr at det er
                Friday Wins denne uka! Har du noe har lyst til å vise frem? Noe du har laget eller noe du har kodet :meow_code:?
                Noen tall og grafer, eller andre nyheter? Da er det helt sikkert lurt å begynne å forberede det nå
                sånn at det ikke blir stress på fredag!`,
            },
        },
    ],
    icon_emoji: ':taco:',
    username: 'Friday Wins',
    text: 'Husk Friday Wins',
})
