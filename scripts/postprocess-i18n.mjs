import fs from "node:fs";
import path from "node:path";

const englishRoot = path.join(process.cwd(), "out", "en");

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(fullPath);
    if (entry.isFile() && entry.name.endsWith(".html")) {
      const source = fs.readFileSync(fullPath, "utf8");
      fs.writeFileSync(fullPath, source.replace('<html lang="zh-CN"', '<html lang="en"'), "utf8");
    }
  }
}

if (fs.existsSync(englishRoot)) visit(englishRoot);
