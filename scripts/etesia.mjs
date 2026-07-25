const MODULE_ID = "etesia-arniea-compendium";

Hooks.once("init", () => {
  console.info(`${MODULE_ID} | Initializing Etesia–Arniea Campaign Compendium`);
  game.settings.register(MODULE_ID, "welcomeShown", {
    name: "Initial module notice shown",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });
});

Hooks.once("ready", async () => {
  game.etesiaCompendium = {
    id: MODULE_ID,
    version: game.modules.get(MODULE_ID)?.version,
    rulesVersion: "2024",
    canonicalNames: Object.freeze({
      wolfsgarde: "Wolfsgarde",
      arnmar: "Arnmar Carhice",
      skyefyre: "Skyefyre",
      harald: "Harald",
      silvercove: "Silvercove",
      morlalin: "Morlalin",
      naenadell: "Naenadell",
      brookside: "Brookside",
      heellond: "Heellond",
      aurem: "Order of Aurem"
    })
  };

  if (!game.user.isGM || game.settings.get(MODULE_ID, "welcomeShown")) return;
  ui.notifications.info("Etesia–Arniea Compendium v0.1.0 is ready. Open the Module Guide journal first.");
  await game.settings.set(MODULE_ID, "welcomeShown", true);
});
