import * as dayjs from 'dayjs'

import { prodansvarlige } from './teammedlemmer'

export function prodansvarlig(): { initialer: string; memberId: string } {
    const startDate = dayjs('2023-08-07')
    const currentDate = dayjs()
    const weeksSinceStart = currentDate.diff(startDate, 'week')

    const ansvarligIndex = weeksSinceStart % prodansvarlige.length // Bruker modulo for å rotere
    return prodansvarlige[ansvarligIndex]
}
