import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'

import { Flexer, flexjaransvarlige } from './teammedlemmer'
import { hentAnsvarligFraFil } from './util/fil'

export function flexjaransvarlig(dagensDato?: Dayjs): Flexer {
    const startDate = dayjs('2025-04-21').startOf('week')
    const currentDate = dagensDato || dayjs()
    const weeksSinceStart = currentDate.diff(startDate, 'week')

    const ansvarligIndex = weeksSinceStart % flexjaransvarlige.length // Bruker modulo for å rotere
    return flexjaransvarlige[ansvarligIndex]
}

export function hentFlexjaransvarlig(denneUken?: number): Flexer {
    return hentAnsvarligFraFil('flexjar', denneUken)
}
