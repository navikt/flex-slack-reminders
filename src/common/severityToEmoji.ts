type severitytype = 'critical' | 'high' | 'medium' | 'low' | 'warning' | 'note' | 'error' | 'none' | null | undefined

export function severityToEmoji(severity: severitytype): string {
    switch (severity) {
        case 'critical':
            return ':severity-critical:'
        case 'high':
            return ':severity-high:'
        case 'medium':
            return ':severity-medium:'
        case 'low':
            return ':severity-low:'
        case 'warning':
            return ':severity-medium:'
        case 'note':
            return ':severity-low:'
        default:
            return ':severity-medium:'
    }
}
