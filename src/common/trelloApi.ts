// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hentTrellokort(): Promise<any[]> {
    const board = process.env['TRELLO_BOARD']
    const token = process.env['TRELLO_TOKEN']
    const key = process.env['TRELLO_KEY']
    if (!board || !token || !key) {
        throw Error('Missing trello envs ')
    }
    const a = await fetch(`https://api.trello.com/1/boards/${board}/cards?key=${key}&token=${token}`)
    return await a.json()
}
