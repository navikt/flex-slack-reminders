# flex-slack-reminders

Generer ansvar-filene ved å kjøre testene

## Bruk av generatorer

### Generer retro-ansvar

```bash
# Standard bruk (starter fra dagens uke med normal rotasjon)
ncc run src/generer-retro.ts

# Med environment variabler (anbefalt)
START_UKE=40 START_PERSON=MV ncc run src/generer-retro.ts

# Alternativt med kommandolinje-argumenter
npx ts-node src/generer-retro.ts 40 PB
```

### Generer flexjar-ansvar

```bash
ncc run src/generer-flexjar.ts
```

### Generer prod-ansvar

```bash
# Standard bruk (starter fra dagens uke med normal rotasjon)
ncc run src/generer-prod-ansvar.ts

# Med environment variabler (anbefalt)
START_UKE=40 START_PERSON=NJM ncc run src/generer-prod-ansvar.ts

# Alternativt med kommandolinje-argumenter
npx ts-node src/generer-prod-ansvar.ts 40 NJM
```

Alle generatorer oppretter JSON-filer i `ukeoversikt/` mappen med 52 ukers data fremover.
