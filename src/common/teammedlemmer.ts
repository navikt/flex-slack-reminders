export interface Flexer {
    initialer: string
    memberId: string
    prodansvar?: boolean
    flexjar?: boolean
    retro?: boolean
}

export const alleFlexere: Flexer[] = [
    { initialer: 'ATS', memberId: 'U04HMSMPTKK', flexjar: true, retro: true },
    { initialer: 'MV', memberId: 'U06QE5KETL2', flexjar: true, retro: true },
    { initialer: 'PB', memberId: 'UE89E1WTY', flexjar: true, retro: true },
    { initialer: 'TM', memberId: 'U06QFQVELJF', flexjar: true, retro: true },
    { initialer: 'GB', memberId: 'U0124V94CLR', prodansvar: true, flexjar: true, retro: true },
    { initialer: 'HSA', memberId: 'UPU6U4H9R', prodansvar: true, flexjar: true, retro: true },
    { initialer: 'NJM', memberId: 'U02AM04QV96', prodansvar: true, flexjar: true, retro: true },
    { initialer: 'OBL', memberId: 'U06FTG7L532', prodansvar: true, flexjar: true, retro: true },
    { initialer: 'ØK', memberId: 'U021UJDDMHB', prodansvar: true, flexjar: true, retro: true },
]

export const prodansvarlige: Flexer[] = alleFlexere.filter((member) => member.prodansvar)

export const flexjaransvarlige: Flexer[] = alleFlexere.filter((member) => member.flexjar)

export const retroansvarlige: Flexer[] = alleFlexere.filter((member) => member.retro)
