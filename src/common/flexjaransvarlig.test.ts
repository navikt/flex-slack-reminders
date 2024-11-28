import { describe, expect, it } from 'vitest'
import dayjs from 'dayjs'

import { hentFlexjaransvarlig, flexjaransvarlig } from './flexjaransvarlig'
import { flexjaransvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagFil } from './util/fil'

describe('flexjaransvarlig Funksjon', () => {
    it('skal returnere det første medlemmet på startdatoen', () => {
        const testDato = dayjs('2023-06-03')
        const ansvarlig = flexjaransvarlig(testDato)
        expect(ansvarlig).toEqual(flexjaransvarlige[0])
    })

    it('skal rotere til neste medlem etter en uke', () => {
        const testDato = dayjs('2023-06-03').add(7, 'days')
        const ansvarlig = flexjaransvarlig(testDato)
        expect(ansvarlig).toEqual(flexjaransvarlige[1])
    })

    it('skal rotere korrekt etter flere ukentlige intervaller', () => {
        const ukerAaLeggeTil = flexjaransvarlige.length // Fullfører én full rotasjon
        const testDato = dayjs('2023-06-03').add(ukerAaLeggeTil, 'weeks')
        const ansvarlig = flexjaransvarlig(testDato)
        expect(ansvarlig).toEqual(flexjaransvarlige[0]) // Skal rotere tilbake til det første medlemmet
    })

    it('skal generere fil og hente inn data fra filen', () => {
        const data = genererUkeData('flexjar')
        lagFil('flexjar', data)
        expect(hentFlexjaransvarlig(47)).toEqual(flexjaransvarlige[9])
    })
})
