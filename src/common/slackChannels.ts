export function flexInternal(): string {
    if (process.env.SLACK_TESTKANAL) {
        return process.env.SLACK_TESTKANAL
    }
    return 'CQZ64G18C'
}

export function flexDev(): string {
    if (process.env.SLACK_TESTKANAL) {
        return process.env.SLACK_TESTKANAL
    }
    return 'G0112C98QG3'
}
export function flexProdansvar(): string {
    if (process.env.SLACK_TESTKANAL) {
        return process.env.SLACK_TESTKANAL
    }
    return 'C06GK4VQFFE'
}
