import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { hentRetroAnsvarlig, retroansvarlig } from './retroansvarlig'
import { retroansvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagFil } from './util/fil'

const startDato = dayjs('2024-09-15')

describe('retroansvarlig Funksjon', () => {
    it('skal returnere det første medlemmet på startdatoen', () => {
        const testDato = startDato
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0])
    })

    it('skal returnere det første medlemmet innenfor de første to ukene', () => {
        const testDato = startDato.add(1, 'weeks')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0])
    })

    it('skal rotere til neste medlem etter to uker', () => {
        const testDato = startDato.add(2, 'weeks')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[1])
    })

    it('skal rotere korrekt etter flere bi-ukentlige intervaller', () => {
        const rotasjonsLengde = retroansvarlige.length
        const ukerAaLeggeTil = rotasjonsLengde * 2 // Fullfører én full rotasjon
        const testDato = startDato.add(ukerAaLeggeTil, 'week')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[0]) // Skal sykle tilbake til det første medlemmet
    })

    it('skal håndtere datoer som ikke er eksakte multipler av to uker', () => {
        const testDato = startDato.add(2, 'weeks').add(1, 'day')
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[1]) // Skal fortsatt være det andre medlemmet
    })

    it('skal returnere korrekt medlem for en fremtidig dato', () => {
        const testDato = dayjs('2025-01-01') // En vilkårlig fremtidig dato
        const ukerSidenStart = testDato.diff(startDato.startOf('week'), 'week')
        const biUkerSidenStart = Math.floor(ukerSidenStart / 2)
        const forventetIndeks = biUkerSidenStart % retroansvarlige.length
        const ansvarlig = retroansvarlig(testDato)
        expect(ansvarlig).toEqual(retroansvarlige[forventetIndeks])
    })

    it('skal generere fil og hente inn data fra filen', () => {
        const data = genererUkeData('retro')
        lagFil('retro', data)
        expect(hentRetroAnsvarlig(38)).toEqual(retroansvarlige[0])
    })
})
