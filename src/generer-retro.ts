import dayjs from './common/util/dayjs-config'
import { genererUkeData } from './common/genererUkeOversikt'
import { lagFil } from './common/util/fil'
import { retroansvarlige, Flexer } from './common/teammedlemmer'

console.log('🚀 Starter generer-retro.ts')
console.log(`📅 Dagens dato: ${dayjs().format('YYYY-MM-DD')} (uke ${dayjs().week()})`)

// Hent argumenter fra environment variabler eller kommandolinje
const args = process.argv.slice(2)
const startUkeEnv = process.env.START_UKE
const startPersonEnv = process.env.START_PERSON

console.log(`📝 Kommandolinje-argumenter: [${args.join(', ')}]`)
console.log(`🌍 Environment variabler: START_UKE=${startUkeEnv}, START_PERSON=${startPersonEnv}`)

// Parse argumenter
let startUke: number | undefined
let startDato = dayjs()
let startPerson: Flexer | undefined

// Prioriter kommandolinje-argumenter, deretter environment variabler
const ukeInput = args[0] || startUkeEnv
const personInput = args[1] || startPersonEnv

// Sjekk om det er spesifisert en startuke
if (ukeInput) {
    const ukeArg = parseInt(ukeInput)
    if (!isNaN(ukeArg) && ukeArg >= 1 && ukeArg <= 53) {
        startUke = ukeArg
        // Finn mandag i den spesifiserte uken
        const gjeldende = dayjs().week(startUke).startOf('week')
        startDato = gjeldende
        console.log(`✅  Genererer retro-ansvar fra uke ${startUke} (${gjeldende.format('YYYY-MM-DD')})`)
    } else {
        console.log('❌ Ugyldig ukenummer. Bruker dagens uke som standard.')
        startUke = dayjs().week()
    }
} else {
    startUke = dayjs().week()
    console.log(`📌 Ingen startuke spesifisert. Bruker dagens uke: ${startUke}`)
}

// Sjekk om det er spesifisert hvem som skal starte
if (personInput) {
    const personInitialer = personInput.toUpperCase()
    console.log(`🔍 Søker etter person med initialer: ${personInitialer}`)
    startPerson = retroansvarlige.find((p) => p.initialer === personInitialer)

    if (startPerson) {
        console.log(`✅  ${startPerson.initialer} starter som retro-ansvarlig fra uke ${startUke}`)
    } else {
        console.log(`❌ Ukjente initialer: ${personInitialer}`)
        console.log('📋 Tilgjengelige retro-ansvarlige:')
        retroansvarlige.forEach((p) => console.log(`  - ${p.initialer}`))
        process.exit(1)
    }
} else {
    console.log(`📌 Ingen startperson spesifisert. Bruker normal rotasjon.`)
}

console.log(`\n🔧 Kaller genererUkeData med:`)
console.log(`   - Ansvar: 'retro'`)
console.log(`   - StartDato: ${startDato.format('YYYY-MM-DD')}`)
console.log(`   - StartPerson: ${startPerson ? startPerson.initialer : 'ingen'}`)

const data = genererUkeData('retro', startDato, startPerson)

console.log(`\n📊 Genererte data:`)
console.log(`   - Antall uker: ${data.length}`)
console.log(`   - Første uke: ${data[0]?.ukenummer} (${data[0]?.datoFra}) - ${data[0]?.ansvarlig.initialer}`)
console.log(`   - Andre uke: ${data[1]?.ukenummer} (${data[1]?.datoFra}) - ${data[1]?.ansvarlig.initialer}`)
console.log(`   - Tredje uke: ${data[2]?.ukenummer} (${data[2]?.datoFra}) - ${data[2]?.ansvarlig.initialer}`)

console.log(`\n💾 Lagrer fil...`)
lagFil('retro', data)
console.log(`✅  Ferdig!`)
