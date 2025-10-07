# flex-slack-reminders

## Bruk av generatorer

Generatorene oppretter JSON-filer i `ukeoversikt/` mappen med 52 ukers data fremover. Du kan spesifisere startuke og hvem som skal starte rotasjonen. Tilgjengelige initialer finner du i `src/common/teammedlemmer.ts`.

**Rotasjonsmønstre:**

- **Retro og prod:** Bi-ukentlig rotasjon (hver person får 2 uker)
- **Flexjar:** Ukentlig rotasjon (hver person får 1 uke)

### Generer retro-ansvar

Standard bruk:

```bash
ncc run src/generer-retro.ts
```

Med custom startuke og person:

```bash
START_UKE=40 START_PERSON=PB ncc run src/generer-retro.ts
```

Alternativ med kommandolinje-argumenter:

```bash
npx ts-node src/generer-retro.ts 40 PB
```

### Generer flexjar-ansvar

Standard bruk:

```bash
ncc run src/generer-flexjar.ts
```

Med custom startuke og person:

```bash
START_UKE=40 START_PERSON=SSH ncc run src/generer-flexjar.ts
```

Alternativ med kommandolinje-argumenter:

```bash
npx ts-node src/generer-flexjar.ts 40 SSH
```

### Generer prod-ansvar

Standard bruk:

```bash
ncc run src/generer-prod-ansvar.ts
```

Med custom startuke og person:

```bash
START_UKE=40 START_PERSON=NJM ncc run src/generer-prod-ansvar.ts
```

Alternativ med kommandolinje-argumenter:

```bash
npx ts-node src/generer-prod-ansvar.ts 40 NJM
```

## Notater

- Environment variabler er anbefalt når du bruker `ncc run`
- Kommandolinje-argumenter fungerer kun med `npx ts-node`
- For å se tilgjengelige initialer, sjekk `src/common/teammedlemmer.ts`
