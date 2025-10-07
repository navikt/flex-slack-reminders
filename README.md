# flex-slack-reminders

## Bruk av generatorer

### Generer retro-ansvar

```bash
# Standard bruk (starter fra dagens uke med normal rotasjon)
ncc run src/generer-retro.ts

# Med environment variabler (anbefalt)
START_UKE=40 START_PERSON=PB ncc run src/generer-retro.ts

# Alternativt med kommandolinje-argumenter
npx ts-node src/generer-retro.ts 40 PB
```

### Generer flexjar-ansvar

```bash
# Standard bruk (starter fra dagens uke med normal rotasjon)
ncc run src/generer-flexjar.ts

# Med environment variabler (anbefalt)
START_UKE=40 START_PERSON=SSH ncc run src/generer-flexjar.ts

# Alternativt med kommandolinje-argumenter
npx ts-node src/generer-flexjar.ts 40 SSH
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
