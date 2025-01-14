export interface Flexer {
    initialer: string
    memberId: string
    prodansvar?: boolean
    flexjar?: boolean
    retro?: boolean
    bursdag?: string
}

export const alleFlexere: Flexer[] = [
    { initialer: 'ATS', memberId: 'U04HMSMPTKK', flexjar: true, retro: true, bursdag: '03-08' },
    { initialer: 'MV', memberId: 'U06QE5KETL2', flexjar: true, retro: true, bursdag: '02-01' },
    { initialer: 'PB', memberId: 'UE89E1WTY', flexjar: true, retro: true, bursdag: '09-19' },
    { initialer: 'TM', memberId: 'U06QFQVELJF', flexjar: true, retro: true, bursdag: '03-16' },
    { initialer: 'NJM', memberId: 'U02AM04QV96', prodansvar: true, flexjar: true, retro: true, bursdag: '01-05' },
    { initialer: 'GB', memberId: 'U0124V94CLR', prodansvar: true, flexjar: true, retro: true, bursdag: '03-08' },
    { initialer: 'HSA', memberId: 'UPU6U4H9R', prodansvar: true, flexjar: true, retro: true, bursdag: '06-13' },
    { initialer: 'OBL', memberId: 'U06FTG7L532', prodansvar: true, flexjar: true, retro: true, bursdag: '02-27' },
    { initialer: 'ØK', memberId: 'U021UJDDMHB', prodansvar: true, flexjar: true, retro: true, bursdag: '01-29' },
    { initialer: 'EHS', memberId: 'U07TAUJLXCM', prodansvar: true, flexjar: true, retro: true, bursdag: '02-15' },
]

export const prodansvarlige: Flexer[] = alleFlexere.filter((member) => member.prodansvar)

export const flexjaransvarlige: Flexer[] = alleFlexere.filter((member) => member.flexjar)

export const retroansvarlige: Flexer[] = alleFlexere.filter((member) => member.retro)

export const bursdagsbarna: Flexer[] = alleFlexere.filter((member) => member.bursdag)
