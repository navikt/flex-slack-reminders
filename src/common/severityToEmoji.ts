type severitytype = 'critical' | 'high' | 'medium' | 'low' | 'warning' | 'note' | 'error' | 'none' | null | undefined

export function severityToEmoji(severity: severitytype): string {
    switch (severity) {
        case 'critical':
            return ':rotating_light:'
        case 'high':
            return ':exclamation:'
        case 'medium':
            return ':warning:'
        case 'low':
            return ':information_source:'
        case 'warning':
            return ':warning:'
        case 'note':
            return ':information_source:'
        default:
            return ':information_source:'
    }
}
