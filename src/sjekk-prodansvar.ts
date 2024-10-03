import './common/configInit'

import { slackWebClient } from './common/slackClient'
import { finnSisteMeldingFraSlackbot, masPaaProdansvarlig } from './common/sjekk-prodansvarlig'
export const sjekkProdAnsvar = async (): Promise<void> => {
    const { bot } = await slackWebClient.bots.info()
    if (!bot) {
        console.error('Fant ikke bot-info')
        return
    }

    const sisteMelding = await finnSisteMeldingFraSlackbot(bot)

    // Ingen reaksjon på prodansvar-melding sender ut påminnelse
    if (sisteMelding && (!sisteMelding.reactions || sisteMelding.reactions.length === 0)) {
        await masPaaProdansvarlig(sisteMelding)
    }
}

//Kjører kun om filen er kjørt direkte (ikke i test)
if (require.main === module) {
    sjekkProdAnsvar().then()
}
