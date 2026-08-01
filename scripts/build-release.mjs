import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outRoot = path.join(root, "dist", "etesia-arniea-compendium");
const versionArg = process.argv.find((a) => a.startsWith("--version="));
const tagArg = process.argv.find((a) => a.startsWith("--tag="));
const version = versionArg ? versionArg.split("=")[1] : JSON.parse(await fs.readFile(path.join(root, "module.json"), "utf8")).version;
const tag = tagArg ? tagArg.split("=")[1] : `v${version}`;

await fs.rm(path.join(root, "dist"), { recursive: true, force: true });
await fs.mkdir(outRoot, { recursive: true });
for (const entry of ["assets", "styles"]) await fs.cp(path.join(root, entry), path.join(outRoot, entry), { recursive: true });
await fs.mkdir(path.join(outRoot, "scripts"), { recursive: true });
await fs.copyFile(path.join(root, "scripts", "etesia.mjs"), path.join(outRoot, "scripts", "etesia.mjs"));

const packs = [
  ["etesia-actors", "Actor"], ["etesia-items", "Item"], ["etesia-journals", "JournalEntry"],
  ["transfer-actors", "Actor"], ["transfer-items", "Item"], ["transfer-journals", "JournalEntry"],
  ["keywell-hag-actors", "Actor"]
];
await fs.mkdir(path.join(outRoot, "packs"), { recursive: true });
for (const [name] of packs) {
  await compilePack(path.join(root, "src", "packs", name), path.join(outRoot, "packs", name));
}

const manifest = JSON.parse(await fs.readFile(path.join(root, "module.json"), "utf8"));
manifest.version = version;
manifest.manifest = `https://github.com/thystra/etesia-arniea-compendium/releases/latest/download/module.json`;
manifest.download = `https://github.com/thystra/etesia-arniea-compendium/releases/download/${tag}/etesia-arniea-compendium-v${version}.zip`;
await fs.writeFile(path.join(outRoot, "module.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Built ${manifest.title} v${version} at ${outRoot}`);
