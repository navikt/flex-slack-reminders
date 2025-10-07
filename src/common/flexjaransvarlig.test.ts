import { describe, expect, it, afterEach } from 'vitest'
import dayjs from 'dayjs'

import { flexjaransvarlig } from './flexjaransvarlig'
import { flexjaransvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagTempFil, slettTempFil } from './util/fil'

const testDato = dayjs('2025-04-21')
let tempFilePaths: string[] = []

afterEach(() => {
    tempFilePaths.forEach((filePath) => slettTempFil(filePath))
    tempFilePaths = []
})

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
        const tempFilePath = lagTempFil('flexjar', data)
        tempFilePaths.push(tempFilePath)

        expect(data.length).toBe(52)
        expect(data[0].ansvarlig.flexjar).toBeTruthy()
    })

    it('skal generere data med tilpasset startperson', () => {
        const startPerson = flexjaransvarlige[2] // Velg tredje person i listen
        const data = genererUkeData('flexjar', testDato, startPerson)

        expect(data[0].ansvarlig).toEqual(startPerson)
        expect(data[1].ansvarlig).toEqual(flexjaransvarlige[3]) // Ukentlig rotasjon
        expect(data[2].ansvarlig).toEqual(flexjaransvarlige[4]) // Neste person etter 1 uke
    })

    it('skal håndtere rotasjon med tilpasset startperson korrekt', () => {
        const startPerson = flexjaransvarlige[5] // Start med sjette person
        const data = genererUkeData('flexjar', testDato, startPerson)

        // Ukentlig rotasjon
        expect(data[0].ansvarlig).toEqual(flexjaransvarlige[5])
        expect(data[1].ansvarlig).toEqual(flexjaransvarlige[6])
        expect(data[2].ansvarlig).toEqual(flexjaransvarlige[7])

        // Wrapping til start av listen
        const nestePerson = flexjaransvarlige[0] // Skal wrappe rundt
        expect(data[3].ansvarlig).toEqual(nestePerson)
    })
})
