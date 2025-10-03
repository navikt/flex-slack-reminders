import { readFileSync } from 'fs'

import dayjs, { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { retroansvarlig } from './retroansvarlig'
import { flexjaransvarlig } from './flexjaransvarlig'
import { prodansvarlig } from './prodansvarlig'
import { Flexer, prodansvarlige, retroansvarlige } from './teammedlemmer'

dayjs.extend(weekOfYear)

export interface UkeData {
    ukenummer: number
    datoFra: string // ISO dato
    datoTil: string // ISO dato
    ansvarlig: Flexer
}

export function genererUkeData(ansvar: 'retro' | 'flexjar' | 'prod', start?: Dayjs, startPerson?: Flexer): UkeData[] {
    const ukeDataListe: UkeData[] = []

    const idag = start || dayjs()
    const startDato = idag.startOf('week') // Mandag i inneværende uke

    //1 år frem
    for (let i = 0; i < 52; i++) {
        const ukeStart = startDato.add(i, 'week')
        const ukeSlutt = ukeStart.endOf('week')

        const ukenummer = ukeStart.week()

        const ansvarlig = (): Flexer => {
            switch (ansvar) {
                case 'retro':
                    if (startPerson) {
                        // Bruk custom logikk for retro med startperson
                        const startIndex = retroansvarlige.findIndex(p => p.initialer === startPerson.initialer)
                        const biWeeksSinceStart = Math.floor(i / 2)
                        const ansvarligIndex = (startIndex + biWeeksSinceStart) % retroansvarlige.length
                        return retroansvarlige[ansvarligIndex]
                    } else {
                        return retroansvarlig(ukeStart)
                    }
                case 'flexjar':
                    return flexjaransvarlig(ukeStart)
                case 'prod':
                    if (startPerson) {
                        // Bruk custom logikk for prod med startperson
                        const startIndex = prodansvarlige.findIndex(p => p.initialer === startPerson.initialer)
                        const biWeeksSinceStart = Math.floor(i / 2)
                        const ansvarligIndex = (startIndex + biWeeksSinceStart) % prodansvarlige.length
                        return prodansvarlige[ansvarligIndex]
                    } else {
                        return prodansvarlig(ukeStart)
                    }
            }
        }

        ukeDataListe.push({
            ukenummer: ukenummer,
            datoFra: ukeStart.format('YYYY-MM-DD'),
            datoTil: ukeSlutt.format('YYYY-MM-DD'),
            ansvarlig: ansvarlig(),
        })
    }

    return ukeDataListe
}

export function hentDataForUkenummer(filbane: string, ukenummer: number): UkeData {
    try {
        const jsonData = readFileSync(filbane, 'utf-8')
        const data = JSON.parse(jsonData)
        const resultat = data.find((uke: UkeData) => uke.ukenummer === ukenummer)
        return resultat ? resultat : `Ingen data funnet for ukenummer: ${ukenummer}`
    } catch (error) {
        console.error('Feil ved lesing av filen:', error)
        throw error
    }
}
