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

// Etesia module-local image validation v0.1.4
const moduleImagePrefix = "modules/etesia-arniea-compendium/";
const missingImages = [];
let checkedImages = 0;
function validateImageReference(value, context) {
  if (typeof value !== "string" || !value) return;
  let relative = null;
  if (value.startsWith(moduleImagePrefix)) relative = value.slice(moduleImagePrefix.length);
  else if (value.startsWith("assets/")) relative = value;
  if (!relative) return;
  checkedImages += 1;
  const candidate = path.join(root, relative);
  if (!fs.existsSync(candidate)) missingImages.push(`${context}: ${value}`);
}
function walkImages(value, context = "document") {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkImages(entry, `${context}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if ((key === "img" || key === "src") && typeof child === "string") {
      validateImageReference(child, `${context}.${key}`);
    }
    walkImages(child, `${context}.${key}`);
  }
}
for (const pack of manifest.packs) {
  const dir = path.join(root, "src", "packs", pack.name);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const doc = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    walkImages(doc, `${pack.name}/${file}`);
  }
}
if (missingImages.length) {
  throw new Error(`Missing module-local images:\n${missingImages.join("\n")}`);
}
console.log(`Validated ${checkedImages} module-local image references.`);

console.log(`Validated ${manifest.packs.length} packs and ${ids.size} top-level documents.`);
