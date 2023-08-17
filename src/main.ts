import { config } from 'dotenv'

config()
if (!process.env.GITHUB_PAT) {
    throw Error('Missing env GITHUB_PAT')
}

console.log('Sjekker for gamle pullrequests')

console.log(process.env.GITHUB_PAT)
