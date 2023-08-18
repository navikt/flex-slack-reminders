import './common/configInit'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { sendSlackMessage } from './common/slackPosting'
import { numberToSlackEmoji } from './common/numberToEmoji'

const repoer = hentRepoer()

for (const repo of repoer) {
    console.log('Henter for repo ' + repo)
    const dependabotAlerts = await octokit.request('GET /repos/{owner}/{repo}/dependabot/alerts', {
        owner: 'navikt',
        repo: repo,
        state: 'open',
    })

    if (dependabotAlerts.data.length > 0) {
        // eslint-disable-next-line
        const blocks = [] as any[]
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

        await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
        console.log(`Sendte til slack for repo '${repo}'`)
    }
}
