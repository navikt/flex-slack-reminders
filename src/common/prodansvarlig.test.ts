import { describe, it, expect, afterEach } from 'vitest'
import dayjs from 'dayjs'

import { prodansvarlig } from './prodansvarlig'
import { prodansvarlige } from './teammedlemmer'
import { genererUkeData } from './genererUkeOversikt'
import { lagTempFil, slettTempFil } from './util/fil'

const startDato = dayjs('2025-04-21')
let tempFilePaths: string[] = []

afterEach(() => {
    tempFilePaths.forEach((filePath) => slettTempFil(filePath))
    tempFilePaths = []
})

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
        const tempFilePath = lagTempFil('prod', data)
        tempFilePaths.push(tempFilePath)

        expect(data.length).toBe(52)
        expect(data[0].ansvarlig.prodansvar).toBeTruthy()
    })

    it('skal generere data med tilpasset startperson', () => {
        const startPerson = prodansvarlige[1] // Velg andre person i listen
        const data = genererUkeData('prod', startDato, startPerson)

        expect(data[0].ansvarlig).toEqual(startPerson)
        expect(data[1].ansvarlig).toEqual(startPerson) // Bi-ukentlig rotasjon
        expect(data[2].ansvarlig).toEqual(prodansvarlige[2]) // Neste person etter 2 uker
    })

    it('skal håndtere rotasjon med tilpasset startperson korrekt', () => {
        const startPerson = prodansvarlige[2] // Start med tredje person
        const data = genererUkeData('prod', startDato, startPerson)

        // Første bi-uke
        expect(data[0].ansvarlig).toEqual(prodansvarlige[2])
        expect(data[1].ansvarlig).toEqual(prodansvarlige[2])

        // Andre bi-uke
        expect(data[2].ansvarlig).toEqual(prodansvarlige[3])
        expect(data[3].ansvarlig).toEqual(prodansvarlige[3])

        // Tredje bi-uke (skal wrappe rundt til start av listen)
        const nestePerson = prodansvarlige[0] // Wrapping til start
        expect(data[4].ansvarlig).toEqual(nestePerson)
    })
})
