import './common/configInit'

import { Block, KnownBlock } from '@slack/types'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { numberToSlackEmoji } from './common/numberToEmoji'
import { slackWebClient } from './common/slackClient'
import { flexDev } from './common/slackChannels'

const repoer = hentRepoer()
const alleBlocks = [] as (KnownBlock | Block)[][]

for (const repo of repoer) {
    console.log('Henter for repo ' + repo)
    const dependabotAlerts = await octokit.request('GET /repos/{owner}/{repo}/dependabot/alerts', {
        owner: 'navikt',
        repo: repo,
        state: 'open',
    })

    if (dependabotAlerts.data.length > 0) {
        const blocks = [] as (KnownBlock | Block)[]
        blocks.push({ type: 'divider' })
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:dependabot: :stop-sign:  * <https://www.github.com/navikt/${repo}|${repo}>*
Har totalt <https://www.github.com/navikt/${repo}/security/dependabot|${dependabotAlerts.data.length} dependabot alerts>.
Vi bør fikse eller lukke disse`,
            },
        })
        dependabotAlerts.data.map((alert, idx) => {
            blocks.push({ type: 'divider' })
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${numberToSlackEmoji(idx + 1)} *<${alert.html_url}|${alert.security_advisory.summary}>*`,
                },
            })
        })

        alleBlocks.push(blocks)
    }
}

if (alleBlocks.length > 0) {
    const hovedpost = await slackWebClient.chat.postMessage({
        channel: flexDev(),
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `Vi har Dependabot alerts!`,
                },
            },
        ],
        icon_emoji: ':dependabot:',
        username: 'Dependabot alerts',
        text: 'Dependabot',
    })
    alleBlocks.forEach(async (blocks) => {
        await slackWebClient.chat.postMessage({
            channel: flexDev(),
            blocks,
            icon_emoji: ':warning:',
            username: 'Dependabot alerts må ryddes i',
            text: 'Dependabot',
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
                    text: `:meow_tada:`,
                },
            },
        ],
        icon_emoji: ':godstolen:',
        username: 'Vi har ingen Dependabot alerts!',
        text: 'Dependabot',
    })
}
