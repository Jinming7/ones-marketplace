import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const exts = new Set([".ts", ".tsx", ".css"]);
const excludedDirs = new Set(["node_modules", ".next", ".git"]);
const excludedFiles = new Set([
  path.join(root, "styles", "tokens.css"),
  path.join(root, "brand", "tokens.json"),
]);

const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
const matches = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) continue;
      walk(fullPath);
      continue;
    }

    if (!exts.has(path.extname(entry.name))) continue;
    if (excludedFiles.has(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const found = line.match(hexRegex);
      if (!found) continue;

      for (const hex of found) {
        matches.push(`${path.relative(root, fullPath)}:${i + 1} ${hex}`);
      }
    }
  }
}

walk(root);

if (matches.length > 0) {
  console.error("Found hardcoded hex colors:");
  for (const item of matches) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("No hardcoded hex colors found outside token files.");
