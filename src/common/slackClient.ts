import { WebClient } from '@slack/web-api'

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN

// Initialize
export const slackWebClient = new WebClient(token)
