import * as dayjs from 'dayjs'

import { octokit } from '../octokit'

import { hentRepoer } from './common/hentRepoer'

console.log('Sjekker for gamle pullrequests')

const repoer = hentRepoer()
const antallDager = 8

for (const repo of repoer) {
    console.log(repo)
    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'navikt',
        repo: repo,
    })
    const gamle = pulls.data.filter((pull) => dayjs().diff(dayjs(pull.created_at), 'day') > antallDager)
    gamle.forEach((pull) => {
        console.log(`${pull.title} ${pull.html_url}`)
    })
}
