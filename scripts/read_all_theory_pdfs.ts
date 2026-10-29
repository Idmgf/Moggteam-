import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

async function parsePdf(filePath: string) {
  const buf = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buf });
  await parser.load();
  const text = await parser.getText();
  return text;
}

async function run() {
  const files = [
    "тоерия/05_Промо-механика_QURT.pdf",
    "тоерия/06_Отчёт_AI_QURT.pdf",
    "тоерия/09_Расчёт_производства_QURT.pdf",
    "тоерия/Промпты.pdf",
    "тоерия/QURT отчёт о проделанной работе.pdf"
  ];

  for (const f of files) {
    const p = path.resolve(f);
    if (!fs.existsSync(p)) continue;
    try {
      const res = await parsePdf(p);
      console.log(`\n======================================================`);
      console.log(`FILE: ${f}`);
      console.log(`======================================================`);
      console.log(typeof res === "string" ? res.trim() : JSON.stringify(res).slice(0, 5000));
    } catch (e) {
      console.error(`Error parsing ${f}:`, e);
    }
  }
}

run();
