import dayjs, { Dayjs } from './util/dayjs-config'
import { Flexer, retroansvarlige } from './teammedlemmer'
import { hentAnsvarligFraFil } from './util/fil'

export function retroansvarlig(dagensDato?: Dayjs): Flexer {
    const startDate = dayjs('2024-09-20').startOf('week')
    const currentDate = dagensDato || dayjs()
    const weeksSinceStart = currentDate.diff(startDate, 'week')
    // Roterer annen hver uke
    const biWeeksSinceStart = Math.floor(weeksSinceStart / 2)

    const ansvarligIndex = biWeeksSinceStart % retroansvarlige.length
    return retroansvarlige[ansvarligIndex]
}

export function hentRetroAnsvarlig(denneUken?: number): Flexer {
    return hentAnsvarligFraFil('retro', denneUken)
}
