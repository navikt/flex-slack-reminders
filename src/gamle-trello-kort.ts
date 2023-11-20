import './common/configInit'
import * as dayjs from 'dayjs'

import { sendSlackMessage } from './common/slackPosting'
import { numberToSlackEmoji } from './common/numberToEmoji'
import { hentTrellokort } from './common/trelloApi'

const maxDager = 30

const trellokort = await hentTrellokort()
const gamle = trellokort.filter((trello) => dayjs().diff(dayjs(trello.dateLastActivity), 'day') > maxDager)

if (gamle.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks = [] as any[]
    blocks.push({ type: 'divider' })

    blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:warning: *Trellotavla* :trello:
Vi har ${gamle.length} trellokort uten aktivitet de siste  ${maxDager} dagene.
Vurder lukking eller snoozing av disse kortene.`,
        },
    })

    gamle.map((pull, idx) => {
        blocks.push({ type: 'divider' })
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${numberToSlackEmoji(idx + 1)} *<${pull.shortUrl}|${pull.name}>*`,
            },
        })
    })

    await sendSlackMessage('FLEXINTERNAL_WEBHOOK', { blocks })
}
