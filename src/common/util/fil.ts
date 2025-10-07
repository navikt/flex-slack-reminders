import path from 'node:path'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs'
import { readFileSync } from 'fs'
import { tmpdir } from 'node:os'

import dayjs from 'dayjs'

import { AnsvarType, UkeData } from '../genererUkeOversikt'
import { Flexer } from '../teammedlemmer'

const outputDir = path.join(process.cwd(), 'ukeoversikt')

export function lagFil(ansvar: AnsvarType, data: UkeData[]): void {
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

function hentDataForUkenummer(filbane: string, ukenummer: number): UkeData {
    try {
        const jsonData = readFileSync(filbane, 'utf-8')
        const data = JSON.parse(jsonData)
        const resultat = data.find((uke: UkeData) => uke.ukenummer === ukenummer)
        return resultat ? resultat : `Ingen data funnet for ukenummer: ${ukenummer}`
    } catch (error) {
        console.error('Feil ved lesing av filen:', error)
        throw error
    }
}

export function hentAnsvarligFraFil(ansvar: AnsvarType, uke?: number): Flexer {
    const filbane = `ukeoversikt/${ansvar}-ansvarlig.json`
    const ukenummer = uke || dayjs().week()
    return hentDataForUkenummer(filbane, ukenummer).ansvarlig
}

export function lagTempFil(ansvar: AnsvarType, data: UkeData[]): string {
    const tempDir = tmpdir()
    const tempFilePath = path.join(tempDir, `test-${ansvar}-ansvarlig-${Date.now()}.json`)

    const jsonData = JSON.stringify(data, null, 2)
    writeFileSync(tempFilePath, jsonData)

    return tempFilePath
}

export function slettTempFil(filePath: string): void {
    if (existsSync(filePath)) {
        unlinkSync(filePath)
    }
}
