import './common/configInit'
import * as dayjs from 'dayjs'
import { Block, KnownBlock } from '@slack/types'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { numberToSlackEmoji } from './common/numberToEmoji'
import { slackWebClient } from './common/slackClient'
import { flexDev } from './common/slackChannels'

const repoer = hentRepoer()
const antallDager = 7
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const alleBlocks = [] as (KnownBlock | Block)[][]
let antallGamle = 0

for (const repo of repoer) {
    console.log(`Sjekker repo '${repo}'`)
    const pulls = (
        await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: 'navikt',
            repo: repo,
        })
    ).data.filter((pull) => !pull.draft)
    const gamle = pulls.filter((pull) => dayjs().diff(dayjs(pull.created_at), 'day') > antallDager)
    antallGamle += gamle.length
    if (gamle.length > 0) {
        const blocks = [] as (KnownBlock | Block)[]

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `

* <https://www.github.com/navikt/${repo}|${repo}>*
Har totalt <https://www.github.com/navikt/${repo}/pulls|${pulls.length} pull requests>. ${gamle.length} av dem er eldre enn ${antallDager} dager.
Vi bør merge eller lukke disse`,
            },
        })

        gamle.map((pull, idx) => {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${numberToSlackEmoji(idx + 1)} *<${pull.html_url}|${pull.title}>*`,
                },
            })

            blocks.push({
                type: 'context',
                elements: [
                    {
                        type: 'image',
                        image_url: pull.user?.avatar_url || '',
                        alt_text: pull.user?.login || '',
                    },
                    {
                        type: 'plain_text',
                        emoji: true,
                        text: pull.user?.login || '',
                    },
                ],
            })
        })
        alleBlocks.push(blocks)
    }
}

if (antallGamle > 0) {
    const hovedpost = await slackWebClient.chat.postMessage({
        channel: flexDev(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Det er ${antallGamle} pullrequests som er eldre enn ${antallDager} dager.`,
                },
            },
        ],
        icon_emoji: ':warning:',
        username: 'Pullrequests må ryddes i',
        text: 'Pullrequests',
    })
    alleBlocks.forEach(async (blocks) => {
        await slackWebClient.chat.postMessage({
            channel: flexDev(),
            blocks,
            icon_emoji: ':warning:',
            username: 'Pullrequests må ryddes i',
            text: 'Pullrequests',
            thread_ts: hovedpost.ts,
        })
    })
} else {
    await slackWebClient.chat.postMessage({
        channel: flexDev(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Det er ingen pullrequests som er eldre enn ${antallDager} dager.`,
                },
            },
        ],
        icon_emoji: ':godstolen:',
        username: 'Pullrequests er under kontroll',
        text: 'Pullrequests',
    })
}
