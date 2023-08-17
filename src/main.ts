import {config} from 'dotenv'
import * as fs from "fs";

config()
if (!process.env.GITHUB_TOKEN) {
    throw Error('Missing env GITHUB_TOKEN')
}

console.log('Sjekker for gamle pullrequests')

const file = fs.readFileSync('./repos.txt', 'utf8') as string
file.split('\n').forEach((line) => {
    if(line)
    console.log("repo: " + line)
})
