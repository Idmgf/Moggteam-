import fs from "node:fs";
import path from "node:path";

function extractText(filePath: string) {
  const buf = fs.readFileSync(filePath);
  const str = buf.toString("latin1");
  console.log(`\n======================================================`);
  console.log(`FILE: ${filePath} (${buf.length} bytes)`);
  console.log(`======================================================`);

  // Look for PDF text objects: BT ... ET
  const btRegex = /BT[\s\S]*?ET/g;
  const matches = str.match(btRegex) || [];
  console.log(`Found ${matches.length} text blocks.`);
  
  // Extract strings inside parentheses
  const textPieces: string[] = [];
  const textRegex = /\(([^\(\)\\]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = textRegex.exec(str)) !== null) {
    if (m[1].trim().length > 1) {
      textPieces.push(m[1].trim());
    }
  }
  console.log(`Extracted strings count: ${textPieces.length}`);
  console.log("Sample strings:", textPieces.slice(0, 40).join(" | "));
}

extractText("тоерия/05_Промо-механика_QURT.pdf");
extractText("тоерия/09_Расчёт_производства_QURT.pdf");
extractText("тоерия/Промпты.pdf");
extractText("тоерия/QURT отчёт о проделанной работе.pdf");
