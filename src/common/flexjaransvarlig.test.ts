import { describe, expect, it } from 'vitest'
import dayjs from 'dayjs'

import { hentFlexjaransvarlig, flexjaransvarlig } from './flexjaransvarlig'
import { flexjaransvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagFil } from './util/fil'

const testDato = dayjs('2025-04-21')

describe('flexjaransvarlig Funksjon', () => {
    it('skal returnere det første medlemmet på startdatoen', () => {
        const ansvarlig = flexjaransvarlig(testDato)
        expect(ansvarlig).toEqual(flexjaransvarlige[0])
    })

    it('skal rotere til neste medlem etter en uke', () => {
        const datoNesteUke = testDato.add(7, 'days')
        const ansvarlig = flexjaransvarlig(datoNesteUke)
        expect(ansvarlig).toEqual(flexjaransvarlige[1])
    })

    it('skal rotere korrekt etter flere ukentlige intervaller', () => {
        const datoEtterFullRotasjon = testDato.add(flexjaransvarlige.length, 'weeks')
        const ansvarlig = flexjaransvarlig(datoEtterFullRotasjon)
        expect(ansvarlig).toEqual(flexjaransvarlige[0]) // Skal rotere tilbake til det første medlemmet
    })

    it('skal generere fil og hente data fra filen', () => {
        const data = genererUkeData('flexjar', dayjs(testDato))
        lagFil('flexjar', data)
        const flexjaransvarlig = hentFlexjaransvarlig()
        expect(flexjaransvarlig.flexjar).toBeTruthy
    })
})
