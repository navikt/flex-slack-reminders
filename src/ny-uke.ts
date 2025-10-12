import './common/configInit'
import dayjs from './common/util/dayjs-config'
import { hentProdansvarlig } from './common/prodansvarlig'
import { hentFlexjaransvarlig } from './common/flexjaransvarlig'
import { slackWebClient } from './common/slackClient'
import { flexInternal } from './common/slackChannels'
import { hentRetroAnsvarlig } from './common/retroansvarlig'

dayjs('2018-06-27').week() // 26

await slackWebClient.chat.postMessage({
    channel: flexInternal(),
    blocks: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `:wave: Det er ukenummer ${dayjs().week()} `,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Det er <@${hentProdansvarlig().memberId}> som er bauta hele denne uka.`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `På fredag har <@${hentFlexjaransvarlig().memberId}> flexjaransvar.`,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `Neste retro skal fasiliteres av <@${hentRetroAnsvarlig().memberId}>.`,
            },
        },
    ],
    icon_emoji: ':godstolen:',
    username: 'Ny uke for Team Flex',
    text: 'Ny uke',
})
