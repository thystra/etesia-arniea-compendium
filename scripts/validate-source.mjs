import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "module.json"), "utf8"));
if (manifest.compatibility?.verified !== "14") throw new Error("Foundry verified version must be 14");
const ids = new Set();
for (const pack of manifest.packs) {
  const dir = path.join(root, "src", "packs", pack.name);
  if (!fs.existsSync(dir)) throw new Error(`Missing source pack ${pack.name}`);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const doc = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    if (!doc._id || !doc._key) throw new Error(`Missing _id/_key in ${pack.name}/${file}`);
    const key = `${pack.name}:${doc._id}`;
    if (ids.has(key)) throw new Error(`Duplicate document id ${key}`);
    ids.add(key);
  }
}
console.log(`Validated ${manifest.packs.length} packs and ${ids.size} top-level documents.`);
