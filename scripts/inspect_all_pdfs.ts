import fs from "node:fs";
import path from "node:path";

const files = fs.readdirSync("тоерия").filter(f => f.endsWith(".pdf"));
for (const file of files) {
  const buf = fs.readFileSync(path.join("тоерия", file));
  const str = buf.toString("latin1");
  console.log(`\n=== FILE: ${file} (size: ${buf.length}) ===`);
  // Look for text strings in PDF
  const textMatches = str.match(/\(([^\(\)\\]{3,})\)/g);
  if (textMatches) {
    const sample = textMatches.slice(0, 15).map(t => t.slice(1, -1)).join(" | ");
    console.log("Text sample:", sample);
  }
}
