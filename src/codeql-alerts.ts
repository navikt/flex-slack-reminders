import './common/configInit'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { sendSlackMessage } from './common/slackPosting'
import { severityToEmoji } from './common/severityToEmoji'

const repoer = hentRepoer()
let fantAlert = false

for (const repo of repoer) {
    console.log('Henter for repo ' + repo)
    try {
        const codeScanningAlerts = await octokit.request('GET /repos/{owner}/{repo}/code-scanning/alerts', {
            owner: 'navikt',
            repo: repo,
            state: 'open',
        })
        if (codeScanningAlerts.data.length > 0) {
            fantAlert = true
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

            await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
            console.log(`Sendte til slack for repo '${repo}'`)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        if (e.status == 404) {
            console.log(`Repo ${repo} har ikke code scanning alerts`)
        }
    }
}

if (!fantAlert) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks = [] as any[]
    blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `:godstolen: *Ingen code scanning alerts i noen av repoene våre* :tada: `,
        },
    })

    await sendSlackMessage('FLEX_DEV_WEBHOOK', { blocks })
}
