import dayjs, { Dayjs } from './util/dayjs-config'
import { retroansvarlig } from './retroansvarlig'
import { flexjaransvarlig } from './flexjaransvarlig'
import { prodansvarlig } from './prodansvarlig'
import { Flexer, flexjaransvarlige, prodansvarlige, retroansvarlige } from './teammedlemmer'

export interface UkeData {
    ukenummer: number
    datoFra: string
    datoTil: string
    ansvarlig: Flexer
}

export type AnsvarType = 'retro' | 'flexjar' | 'prod'

const UKER_I_AAR = 52
const BI_UKENTLIG_DIVISOR = 2

function hentAnsvarligeForType(ansvarType: AnsvarType): Flexer[] {
    const ansvarligeMap = {
        retro: retroansvarlige,
        flexjar: flexjaransvarlige,
        prod: prodansvarlige,
    }
    return ansvarligeMap[ansvarType]
}

function beregnUkerSidenStart(ansvarType: AnsvarType, ukeIndeks: number): number {
    const erBiUkentligRotasjon = ansvarType === 'retro' || ansvarType === 'prod'
    return erBiUkentligRotasjon ? Math.floor(ukeIndeks / BI_UKENTLIG_DIVISOR) : ukeIndeks
}

function beregnAnsvarligMedTilpassetStart(ansvarType: AnsvarType, ukeIndeks: number, startPerson: Flexer): Flexer {
    const ansvarligeArray = hentAnsvarligeForType(ansvarType)
    const ukerSidenStart = beregnUkerSidenStart(ansvarType, ukeIndeks)
    const startIndeks = ansvarligeArray.findIndex((person) => person.initialer === startPerson.initialer)
    const ansvarligIndeks = (startIndeks + ukerSidenStart) % ansvarligeArray.length

    return ansvarligeArray[ansvarligIndeks]
}

function hentAnsvarligForUke(ansvarType: AnsvarType, ukeStart: Dayjs, ukeIndeks: number, startPerson?: Flexer): Flexer {
    if (startPerson) {
        return beregnAnsvarligMedTilpassetStart(ansvarType, ukeIndeks, startPerson)
    }

    const standardFunksjoner = {
        retro: retroansvarlig,
        flexjar: flexjaransvarlig,
        prod: prodansvarlig,
    }

    return standardFunksjoner[ansvarType](ukeStart)
}

export function genererUkeData(ansvarType: AnsvarType, startDato?: Dayjs, startPerson?: Flexer): UkeData[] {
    const ukeDataListe: UkeData[] = []
    const faktiskStartDato = (startDato || dayjs()).startOf('week')

    for (let ukeIndeks = 0; ukeIndeks < UKER_I_AAR; ukeIndeks++) {
        const mandagIUken = faktiskStartDato.add(ukeIndeks, 'week')
        const sondagIUken = mandagIUken.endOf('week')
        const ukenummer = mandagIUken.week()
        const ansvarlig = hentAnsvarligForUke(ansvarType, mandagIUken, ukeIndeks, startPerson)

        ukeDataListe.push({
            ukenummer,
            datoFra: mandagIUken.format('YYYY-MM-DD'),
            datoTil: sondagIUken.format('YYYY-MM-DD'),
            ansvarlig,
        })
    }

    return ukeDataListe
}
