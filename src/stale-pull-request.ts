import * as dayjs from 'dayjs'

import { octokit } from './octokit'
import { hentRepoer } from './common/hentRepoer'
import { configInit } from './common/configInit'

configInit()

console.log('Sjekker for gamle pullrequests')

const repoer = hentRepoer()
const antallDager = 8

for (const repo of repoer) {
    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: 'navikt',
        repo: repo,
    })
    const gamle = pulls.data.filter((pull) => dayjs().diff(dayjs(pull.created_at), 'day') > antallDager)
    if (gamle.length === 0) {
        break
    }
    gamle.map((pull) => {
        console.log(`${pull.title} ${pull.html_url}`)
    })
}
