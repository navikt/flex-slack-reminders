import { octokit } from '../octokit'

import { hentRepoer } from './common/hentRepoer'
console.log('Sjekker for gamle pullrequests')

const repoer = hentRepoer()

for (const repo of repoer) {
    console.log(repo)
    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'navikt',
        repo: repo,
    })
    pulls.data.map((pull) => {
        console.log(pull.title)
    })
}
