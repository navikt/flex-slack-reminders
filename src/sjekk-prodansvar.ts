import './common/configInit'

import { finnSisteMeldingFraSlackbot, masPaaProdansvarlig } from './common/sjekk-prodansvarlig'
export const sjekkProdAnsvar = async (): Promise<void> => {
    const sisteMelding = await finnSisteMeldingFraSlackbot('B05NWMF3Q64')

    // Ingen reaksjon på prodansvar-melding sender ut påminnelse
    if (sisteMelding && (!sisteMelding.reactions || sisteMelding.reactions.length === 0)) {
        await masPaaProdansvarlig(sisteMelding)
    }
}

if (process.env.NODE_ENV !== 'test') {
    await sjekkProdAnsvar()
}
