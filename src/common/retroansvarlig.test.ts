import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { hentRetroAnsvarlig, retroansvarlig } from './retroansvarlig'
import { retroansvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagFil } from './util/fil'

describe('retroansvarlig Funksjon', () => {
    it('skal returnere det første medlemmet på startdatoen', () => {
        const testDato = dayjs('2024-09-15')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0])
    })

    it('skal returnere det første medlemmet innenfor de første to ukene', () => {
        const testDato = dayjs('2024-09-20') // Startdato
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0])
    })

    it('skal rotere til neste medlem etter to uker', () => {
        const testDato = dayjs('2024-10-04') // To uker etter start
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[1])
    })

    it('skal rotere korrekt etter flere bi-ukentlige intervaller', () => {
        const rotasjonsLengde = retroansvarlige.length
        const ukerAaLeggeTil = rotasjonsLengde * 2 // Fullfører én full rotasjon
        const testDato = dayjs('2024-09-20').add(ukerAaLeggeTil, 'week')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0]) // Skal sykle tilbake til det første medlemmet
    })

    it('skal håndtere datoer som ikke er eksakte multipler av to uker', () => {
        const testDato = dayjs('2024-10-05') // To uker og én dag etter start
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[1]) // Skal fortsatt være det andre medlemmet
    })

    it('skal returnere korrekt medlem for en fremtidig dato', () => {
        const testDato = dayjs('2025-01-01') // En vilkårlig fremtidig dato
        const ukerSidenStart = testDato.diff(dayjs('2024-09-20').startOf('week'), 'week')
        const biUkerSidenStart = Math.floor(ukerSidenStart / 2)
        const forventetIndeks = biUkerSidenStart % retroansvarlige.length
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[forventetIndeks])
    })

    it('skal generere fil og hente inn data fra filen', () => {
        const data = genererUkeData('retro')
        lagFil('retro', data)
        expect(hentRetroAnsvarlig(38).initialer).toEqual('ATS')
    })
})
