import { Octokit } from '@octokit/rest'
import { config } from 'dotenv'

config()
if (!process.env.GITHUB_TOKEN) {
    throw Error('Missing env GITHUB_TOKEN')
}

export const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
})
