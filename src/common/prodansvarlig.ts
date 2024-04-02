import * as dayjs from 'dayjs'

import { prodansvarlige } from './teammedlemmer'

const justeringAvAntall = -2

export function prodansvarlig(): { initialer: string; memberId: string } {
    const startDate = dayjs('2023-08-07')
    const currentDate = dayjs()
    const weeksSinceStart = currentDate.diff(startDate, 'week')

    const ansvarligIndex = (weeksSinceStart + justeringAvAntall) % prodansvarlige.length // Bruker modulo for å rotere
    return prodansvarlige[ansvarligIndex]
}
