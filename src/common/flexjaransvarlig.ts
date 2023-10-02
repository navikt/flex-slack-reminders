import * as dayjs from 'dayjs'

import { flexjaransvarlige } from './teammedlemmer'

export function flexjaransvarlig(): { initialer: string; memberId: string } {
    const startDate = dayjs('2023-06-03').startOf('week')
    const currentDate = dayjs()
    const weeksSinceStart = currentDate.diff(startDate, 'week')

    const ansvarligIndex = weeksSinceStart % flexjaransvarlige.length // Bruker modulo for å rotere
    return flexjaransvarlige[ansvarligIndex]
}
