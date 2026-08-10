import path from 'node:path'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs'
import { readFileSync } from 'fs'
import { tmpdir } from 'node:os'

import { AnsvarType, UkeData } from '../genererUkeOversikt'
import { Flexer } from '../teammedlemmer'

import dayjs from './dayjs-config'

const outputDir = path.join(process.cwd(), 'ukeoversikt')

function lagJsonData(data: UkeData[]): string {
    return JSON.stringify(data, null, 2)
}

function skrivDataTilFil(filbane: string, jsonData: string): void {
    const mappe = path.dirname(filbane)

    if (!existsSync(mappe)) {
        mkdirSync(mappe, { recursive: true })
        console.log(`📂 Opprettet mappen: ${mappe}`)
    }

    writeFileSync(filbane, jsonData)
    console.log(`✅ ${filbane} har blitt generert.`)
}

function skrivAnsvarDataTilFil(ansvar: AnsvarType, data: UkeData[], filbane: string): void {
    const jsonData = lagJsonData(data)
    skrivDataTilFil(filbane, jsonData)
}

export function lagFil(ansvar: AnsvarType, data: UkeData[]): void {
    console.log(`📁 lagFil kalt med ansvar: '${ansvar}', data lengde: ${data.length}`)
    console.log(`📄 JSON data genereres...`)

    const filbane = path.join(outputDir, `${ansvar}-ansvarlig.json`)
    console.log(`💾 Skriver til fil: ${filbane}`)

    skrivAnsvarDataTilFil(ansvar, data, filbane)
}

export function lagTempFil(ansvar: AnsvarType, data: UkeData[]): string {
    const tempDir = tmpdir()
    const tempFilePath = path.join(tempDir, `test-${ansvar}-ansvarlig-${Date.now()}.json`)

    skrivAnsvarDataTilFil(ansvar, data, tempFilePath)

    return tempFilePath
}

export function slettTempFil(filbane: string): void {
    if (existsSync(filbane)) {
        unlinkSync(filbane)
    }
}

function hentDataForUkenummer(filbane: string, ukenummer: number): UkeData {
    let data: UkeData[]
    try {
        const jsonData = readFileSync(filbane, 'utf-8')
        data = JSON.parse(jsonData)
    } catch (error) {
        console.error('Feil ved lesing av filen:', error)
        throw error
    }

    const resultat = data.find((uke) => uke.ukenummer === ukenummer)
    if (!resultat) {
        throw new Error(`Ingen data funnet for ukenummer: ${ukenummer}`)
    }
    return resultat
}

export function hentAnsvarligFraFil(ansvar: AnsvarType, uke?: number): Flexer {
    const filbane = `ukeoversikt/${ansvar}-ansvarlig.json`
    const ukenummer = uke || dayjs().week()
    return hentDataForUkenummer(filbane, ukenummer).ansvarlig
}
