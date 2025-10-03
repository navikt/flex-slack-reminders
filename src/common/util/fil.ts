import path from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

import dayjs from 'dayjs'

import { hentDataForUkenummer, UkeData } from '../genererUkeOversikt'
import { Flexer } from '../teammedlemmer'

const outputDir = path.join(process.cwd(), 'ukeoversikt')

export function lagFil(ansvar: 'retro' | 'flexjar' | 'prod', data: UkeData[]): void {
    console.log(`📁 lagFil kalt med ansvar: '${ansvar}', data lengde: ${data.length}`)

    // Sjekk om 'ukeoversikt' mappen eksisterer, og opprett den hvis ikke
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
        console.log(`📂 Opprettet mappen: ${outputDir}`)
    } else {
        console.log(`📂 Mappen eksisterer allerede: ${outputDir}`)
    }

    // Konverter til JSON
    const jsonData = JSON.stringify(data, null, 2)
    console.log(`📄 JSON data generert, størrelse: ${jsonData.length} tegn`)

    // Bygg den fullstendige filstien
    const outputFilePath = path.join(outputDir, `${ansvar}-ansvarlig.json`)
    console.log(`💾 Skriver til fil: ${outputFilePath}`)

    // Skriv til fil
    writeFileSync(outputFilePath, jsonData)

    console.log(`✅  ${outputFilePath} har blitt generert.`)
}

export function hentAnsvarligFraFil(ansvar: 'retro' | 'flexjar' | 'prod', uke?: number): Flexer {
    const filbane = `ukeoversikt/${ansvar}-ansvarlig.json`
    const ukenummer = uke || dayjs().week()
    return hentDataForUkenummer(filbane, ukenummer).ansvarlig
}
