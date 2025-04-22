import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { hentProdansvarlig, prodansvarlig } from './prodansvarlig'
import { prodansvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagFil } from './util/fil'

const startDato = dayjs('2025-04-21')

describe('prodansvarlig Funksjon', () => {
    it('skal returnere det første medlemmet på startdatoen', () => {
        const ansvarlig = prodansvarlig(startDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[0])
    })

    it('skal returnere det første medlemmet innenfor de første to ukene', () => {
        const testDato = startDato.add(1, 'weeks')
        const ansvarlig = prodansvarlig(testDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[0])
    })

    it('skal rotere til neste medlem etter to uker', () => {
        const testDato = startDato.add(2, 'weeks')
        const ansvarlig = prodansvarlig(testDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[1])
    })

    it('skal rotere korrekt etter flere bi-ukentlige intervaller', () => {
        const rotasjonsLengde = prodansvarlige.length
        const ukerAaLeggeTil = rotasjonsLengde * 2 // Fullfører én full rotasjon
        const testDato = startDato.add(ukerAaLeggeTil, 'week')
        const ansvarlig = prodansvarlig(testDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[0]) // Skal rotere tilbake til det første medlemmet
    })

    it('skal håndtere datoer som ikke er eksakte multipler av to uker', () => {
        const testDato = startDato.add(2, 'weeks').add(1, 'day')
        const ansvarlig = prodansvarlig(testDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[1]) // Skal fortsatt være det andre medlemmet
    })

    it('skal returnere korrekt medlem for en fremtidig dato', () => {
        const testDato = dayjs('2125-01-01') // En vilkårlig fremtidig dato
        const ukerSidenStart = testDato.diff(startDato.startOf('week'), 'week')
        const biUkerSidenStart = Math.floor(ukerSidenStart / 2)
        const forventetIndeks = biUkerSidenStart % prodansvarlige.length
        const ansvarlig = prodansvarlig(testDato, startDato)
        expect(ansvarlig).toEqual(prodansvarlige[forventetIndeks])
    })

    it('skal generere fil og hente inn data fra filen', () => {
        const data = genererUkeData('prod', startDato)
        lagFil('prod', data)
        expect(hentProdansvarlig().prodansvar).toBeTruthy
    })
})
