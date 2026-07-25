# Etesia–Arniea Campaign Compendium

A personal-use Foundry VTT V14 module for Alan's parallel Etesia and Arniea D&D5e campaigns. The initial release focuses on Etesia and the 2024 rules framework.

## Initial contents

- **15 actors:** graduated SSP soldiers, archer, sergeant, forge cleric, three mage tiers, Harald, three War Golem tiers, Spider Defense Unit, Vicar Kolokai Sanguis, and Lady Amara Grethry.
- **8 items:** Manacles of Misfortune, Sentinel Statue, Silver Fang, Skyefyre, Peacebond, Shatter Grenade, Shatter Grenade Launcher, and Soul Stone.
- **15 journals:** canon guide, faction and order notes, source transcriptions, Gravestone and Lightfoot handouts, project timeline, and module instructions.
- **World transfer packs:** empty Actor and Item packs plus an instructions Journal pack.

The NPC mechanics that were not specified in the campaign sources are original **provisional playtest designs**. They deliberately mix attack rolls of at least +5 with saving-throw pressure for a level-8 party. They should be adjusted after actual table play.

## Installation

Install the release manifest from:

`https://github.com/thystra/etesia-arniea-compendium/releases/latest/download/module.json`

Or extract the tagged ZIP into Foundry's `Data/modules` directory. The module requires Foundry V14 and the D&D5e system.

## Development build

```bash
npm install
npm run validate
npm run build -- --version=0.1.0
```

Source documents live under `src/packs`. The build uses `@foundryvtt/foundryvtt-cli` to compile those JSON files into Foundry LevelDB packs.

## Tagged releases

Every pushed tag runs `.github/workflows/release.yml`, compiles all packs, creates an installable ZIP, publishes `module.json`, and creates or updates the corresponding GitHub release.

## Source priority and canon

The controlling requirements are in `compendium layout for chatgpt.odt`. The in-game GM map is authoritative for geographic names and relative placement. See the **00 — Canon and Source Priority** journal for the current canonical spellings and unresolved questions.

## Rights

The software scaffold and build scripts are provided under the MIT License. Original Etesia/Arniea setting content and user-supplied artwork remain reserved to the campaign author and are not intended for public redistribution.
