export interface Flexer {
    initialer: string
    memberId: string
    prodansvar?: boolean
    flexjar?: boolean
    retro?: boolean
    bursdag?: string
}

export const alleFlexere: Flexer[] = [
    { initialer: 'MHJ', memberId: 'U01CX9M44MS', flexjar: true, retro: true, bursdag: '08-19' },
    { initialer: 'TM', memberId: 'U06QFQVELJF', flexjar: true, retro: true, bursdag: '03-16' },
    { initialer: 'NJM', memberId: 'U02AM04QV96', prodansvar: true, flexjar: true, retro: true, bursdag: '01-05' },
    { initialer: 'OBL', memberId: 'U06FTG7L532', prodansvar: true, flexjar: true, retro: true, bursdag: '02-27' },
    { initialer: 'SSH', memberId: 'US0A35WUR', prodansvar: true, flexjar: true, retro: true, bursdag: '11-23' },
    { initialer: 'LSVS', memberId: 'U0BPG6J75T8', prodansvar: true, flexjar: true, retro: true, bursdag: '12-05' },
    { initialer: 'MH', memberId: 'U0BL49JK36W', prodansvar: true, flexjar: true, retro: true, bursdag: '07-17' },
]

export const prodansvarlige: Flexer[] = alleFlexere.filter((member) => member.prodansvar)

export const flexjaransvarlige: Flexer[] = alleFlexere.filter((member) => member.flexjar)

export const retroansvarlige: Flexer[] = alleFlexere.filter((member) => member.retro)

export const bursdagsbarna: Flexer[] = alleFlexere.filter((member) => member.bursdag)
