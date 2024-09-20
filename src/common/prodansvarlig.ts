import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'

import { Flexer, prodansvarlige } from './teammedlemmer'
import { hentAnsvarligFraFil } from './util/fil'

export function prodansvarlig(dagensDato?: Dayjs): { initialer: string; memberId: string } {
    const startDate = dayjs('2023-08-07')
    const currentDate = dagensDato || dayjs()

    // Beregn ukeforskjellen basert på nåværende uke
    const weeksSinceStart = currentDate.diff(startDate, 'week')
    const biWeeksSinceStart = Math.floor(weeksSinceStart / 2)

    const ansvarligIndex = biWeeksSinceStart % prodansvarlige.length

    // Hent ansvarlig fra listen basert på beregnet indeks
    return prodansvarlige[ansvarligIndex]
}

export function hentProdansvarlig(denneUken?: number): Flexer {
    return hentAnsvarligFraFil('prod', denneUken)
}

const prodansvarLoop =
    'https://navno.sharepoint.com/:fl:/r/contentstorage/CSP_403ddf5b-0f8e-459f-a1b3-7f0e45f4560d/Dokumentbibliotek/LoopAppData/Produksjonsansvar.loop?d=w6e8ca584e971468fb85fc38e648dd68f&csf=1&web=1&e=TvZSfH&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF80MDNkZGY1Yi0wZjhlLTQ1OWYtYTFiMy03ZjBlNDVmNDU2MGQmZD1iJTIxVzk4OVFJNFBuMFdoczM4T1JmUldEU2VSbGdycWM1Uk5vM2x2c2VhaFd5Sk15Z0RkaXd2X1RiQ3NER0VxTHhpZSZmPTAxRzZIVVNBNEVVV0dHNDRQSlI1RExRWDZEUlpTSTNWVVAmYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dVlYWnVieTV6YUdGeVpYQnZhVzUwTG1OdmJYeGlJVmM1T0RsUlNUUlFiakJYYUhNek9FOVNabEpYUkZObFVteG5jbkZqTlZKT2J6TnNkbk5sWVdoWGVVcE5lV2RFWkdsM2RsOVVZa056UkVkRmNVeDRhV1Y4TURGSE5raFZVMEV6U3pKQ1ZWbFNSMHMwVjBKR1NUSTFTRTlETTFoT1ZrbFlVZyUzRCUzRCUyMiUyQyUyMmklMjIlM0ElMjI0M2UwZGQxZi1iOWNiLTQyOGMtOWMyNC0wNGVmY2I2MjFiZTglMjIlN0Q%3D'

export const dagTekst = (): string => {
    const mandag = `**God mandag, <@${hentProdansvarlig().memberId}>! 🌞**
Ny uke, nye muligheter – og i dag er du prod-ansvarlig! 🚀

Dagens oppgaver er som følger:
1. **Loggsjekk**: Ta en titt på loggene fra de siste 24 timene 🔍. Se etter feil, advarsler eller noe som ser litt mystisk ut 🧐.
2. **Flex Funksjonell Metrikker**: Ta en kjapp kikk på de funksjonelle metrikene for Flex :grafana-metrics:
4. **Sjekk Pods**: Kontroller pods i prod og dev for eventuelle som henger eller feiler 💻.

Når du har sjekket alt, reager med ✅ her eller skriv en liten oppdatering på hvordan det står til. Vi heier på deg! 💪

---

Hvis du trenger tilgang til alle relevante sider for dagens sjekk, <${prodansvarLoop}|finner du dokumentet her>. 📄
Husk at vi alle setter pris på innsatsen du legger inn – du holder produksjonen flytende! 👏🎉
`

    const tirsdag = `**God tirsdag, <@${hentProdansvarlig().memberId}>! ☕️**
Dagens sjekk er viktig for å holde ting stabilt! 🚀

Her er hva du må gjøre i dag:
1. **Loggsjekk**: Gå gjennom loggene fra de siste 24 timene 🔍. Pass på at ingen feil har sneket seg inn! 🧐
2. **Flex Kafka Lag Dashboard**: Sjekk Kafka-lagget for Flex og sørg for at det ikke er forsinkelser i dataflyten :kafka-logo-white:
3. **Sjekk kanalen #spøkelser**: Gå gjennom kanalen #spøkelser i Slack for SODA-feilmeldinger 👻. Følg instruksjonene i dokumentet.

Når du er ferdig, gi oss et tegn med ✅ her, eller del en kort statusoppdatering. Du gjør en viktig jobb! 🙌

---

Hvis du trenger tilgang til alle relevante sider for dagens sjekk, <${prodansvarLoop}|finner du dokumentet her>. 📄
Keep up the great work! 💪🎉
`

    const onsdag = `**God onsdag, <@${hentProdansvarlig().memberId}>! 🐪**
Halvveis gjennom uken, men vi har fortsatt litt igjen å sjekke! 🚀

Dagens oppgaver:
1. **Loggsjekk**: Fortsett den gode innsatsen med å sjekke loggene fra de siste 24 timene 🔍.
2. **Github Sårbarheter**: Sjekk for eventuelle sårbarheter i GitHub-repositoryene våre :github: Er det noe som må følges opp?
3. **CloudSQL - GCP**: Sjekk at alt ser bra ut med databasen :database: Hold et øye med ytelse, lagring og andre viktige målinger.

Reager med ✅ her når du er ferdig, eller del en rask oppdatering. Takk for innsatsen! 🙌

---

Hvis du trenger tilgang til alle relevante sider for dagens sjekk, <${prodansvarLoop}|finner du dokumentet her>. 📄
Du gjør en strålende jobb! 🌟
`

    const torsdag = `**God torsdag, <@${hentProdansvarlig().memberId}>! 🍂**
Nå nærmer vi oss helgen, men vi har fortsatt noen viktige sjekker å gjøre før vi kan slappe av! 🚀

Dagens oppgaver:
1. **Loggsjekk**: Sjekk loggene fra de siste 24 timene som vanlig 🔍.
2. **CodeQL Funn**: Gå gjennom eventuelle funn i CodeQL og se om det er noe som krever oppmerksomhet :codeql:
3. **Sjekk liste over gamle PRs**: Ta en titt på kanalen #flex-dev og sjekk om det er gamle PRs som fortsatt må følges opp 📋.

Når du har gjennomført dagens sjekk, kan du reagere med ✅ eller gi en rask oppdatering. Fortsett med det gode arbeidet! 💪

---

Hvis du trenger tilgang til alle relevante sider for dagens sjekk, <${prodansvarLoop}|finner du dokumentet her>. 📄
Snart helg, men vi må holde fokus! 🎯
`

    const fredag = `**God fredag, <@${hentProdansvarlig().memberId}>! 🎉**
Siste innspurt før helgen! 🚀

Dagens sjekkliste:
1. **Loggsjekk**: En siste gjennomgang av loggene før helgen 🔍. Sørg for at alt ser bra ut!
2. **NAIS/Salsa Sårbarheter**: Sjekk for sårbarheter på NAIS/Salsa for alle appene våre :nais-spin:
3. **Flex Apper Oversikt**: Gå gjennom statusen på Flex-appene og sørg for at alle tjenester kjører som de skal. Hvis noe ser unormalt ut, gi det ekstra oppmerksomhet! 🔍🚦
4. **Sjekk Pods**: Kontroller pods i både prod og dev-miljøene for å sikre at ingen pods henger eller feiler. Rask oppfølging kan forhindre større problemer! 🚀🛠️

Når alt er sjekket, reager med ✅ eller gi en kort oppdatering. Helgen er rett rundt hjørnet! 🎉

---

Hvis du trenger tilgang til alle relevante sider for dagens sjekk, <${prodansvarLoop}|finner du dokumentet her>. 📄
Takk for innsatsen denne uken, vi setter stor pris på det! 👏

---

**PS! <@${hentProdansvarlig(dayjs().week() + 1).memberId}>, du er prod-ansvarlig neste uke! 💥** Nyt helgen 🏖️, lad opp batteriene 🔋, og vær klar til å rocke produksjonen fra mandag! 🎸🔥
`

    switch (dayjs().day()) {
        case 1:
            return mandag
        case 2:
            return tirsdag
        case 3:
            return onsdag
        case 4:
            return torsdag
        case 5:
            return fredag
        case 6:
        case 0:
            return 'Det er helg, slapp av!'
    }
}
