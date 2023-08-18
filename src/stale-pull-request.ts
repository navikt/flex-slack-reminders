import './common/configInit'
import * as dayjs from 'dayjs'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { sendSlackMessage } from './common/slackPosting'

const repoer = hentRepoer()
const antallDager = 7

for (const repo of repoer) {
    console.log(`Sjekker repo '${repo}'`)
    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'navikt',
        repo: repo,
    })
    const gamle = pulls.data.filter((pull) => dayjs().diff(dayjs(pull.created_at), 'day') > antallDager)
    if (gamle.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blocks = [] as any[]
        blocks.push({ type: 'divider' })

        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:warning: * <https://www.github.com/navikt/${repo}|${repo}>*
Har totalt <https://www.github.com/navikt/${repo}/pulls|${pulls.data.length} pull requests>. ${gamle.length} av dem er eldre enn ${antallDager} dager.
Vi bør merge eller lukke disse`,
            },
        })

        gamle.map((pull, idx) => {
            blocks.push({ type: 'divider' })
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
                        image_url: pull.user?.avatar_url,
                        alt_text: pull.user?.login,
                    },
                    {
                        type: 'plain_text',
                        emoji: true,
                        text: pull.user?.login,
                    },
                ],
            })
        })

        await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
        console.log(`Sendte til slack for repo '${repo}'`)
    }
}

function numberToSlackEmoji(n: number): string {
    switch (n) {
        case 1:
            return ':one:'
        case 2:
            return ':two:'
        case 3:
            return ':three:'
        case 4:
            return ':four:'
        case 5:
            return ':five:'
        case 6:
            return ':six:'
        case 7:
            return ':seven:'
        case 8:
            return ':eight:'
        case 9:
            return ':nine:'
        case 10:
            return ':keycap_ten:'
        default:
            return `${n} `
    }
}
