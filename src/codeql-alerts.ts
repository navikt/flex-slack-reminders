import './common/configInit'

import { Block, KnownBlock } from '@slack/types'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { severityToEmoji } from './common/severityToEmoji'
import { slackWebClient } from './common/slackClient'
import { flexDev } from './common/slackChannels'

const repoer = hentRepoer()
const alleBlocks = [] as (KnownBlock | Block)[][]

for (const repo of repoer) {
    console.log('Henter for repo ' + repo)
    try {
        const codeScanningAlerts = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
            owner: 'navikt',
            repo: repo,
            state: 'open',
        })
        if (codeScanningAlerts.data.length > 0) {
            // eslint-disable-next-line
            const blocks = [] as any[]
            blocks.push({ type: 'divider' })
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `* <https://www.github.com/navikt/${repo}|${repo}>*
Har totalt <https://www.github.com/navikt/${repo}/security/dependabot|${codeScanningAlerts.data.length} code scanning alerts>.
Vi bør fikse eller lukke disse`,
                },
            })
            codeScanningAlerts.data.map((alert) => {
                blocks.push({ type: 'divider' })
                blocks.push({
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${severityToEmoji(alert.rule.severity)}  *<${alert.html_url}|${
                            alert.rule.description
                        }>*`,
                    },
                })
            })
            alleBlocks.push(blocks)

            console.log(`Sendte til slack for repo '${repo}'`)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        if (e.status == 404) {
            console.log(`Repo ${repo} har ikke code scanning alerts`)
        }
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
                    text: `Vi har CodeQL alerts!`,
                },
            },
        ],
        icon_emoji: ':codeql:',
        username: 'CodeQL alerts',
        text: 'CodeQL',
    })
    alleBlocks.forEach(async (blocks) => {
        await slackWebClient.chat.postMessage({
            channel: flexDev(),
            blocks,
            icon_emoji: ':warning:',
            username: 'CodeQL alerts må ryddes i',
            text: 'CodeQL',
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
        username: 'Vi har ingen CodeQL alerts!',
        text: 'CodeQL',
    })
}
