import './common/configInit'
import * as dayjs from 'dayjs'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'

const repoer = hentRepoer()

for (const repo of repoer) {
    console.log(`Sjekker repo '${repo}'`)
    const sikerhet = await octokit.request('GET /repos/{owner}/{repo}/security-advisories', {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })

    console.log(sikerhet)
}
