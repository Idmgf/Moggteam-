import fs from "node:fs";
import path from "node:path";

function decodeAscii85(a85: string): Buffer {
  // remove whitespace
  const cleaned = a85.replace(/\s+/g, "");
  // trim leading <~ and trailing ~> if present
  let s = cleaned;
  if (s.startsWith("<~")) s = s.slice(2);
  if (s.endsWith("~>")) s = s.slice(0, -2);

  const out: number[] = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === "z") {
      out.push(0, 0, 0, 0);
      i++;
      continue;
    }
    const chunk = s.slice(i, i + 5);
    const len = chunk.length;
    let tuple = 0;
    for (let j = 0; j < 5; j++) {
      const code = j < len ? chunk.charCodeAt(j) - 33 : 84; // pad with 'u' (84)
      tuple = tuple * 85 + code;
    }
    const b0 = (tuple >>> 24) & 0xff;
    const b1 = (tuple >>> 16) & 0xff;
    const b2 = (tuple >>> 8) & 0xff;
    const b3 = tuple & 0xff;

    if (len >= 2) out.push(b0);
    if (len >= 3) out.push(b1);
    if (len >= 4) out.push(b2);
    if (len >= 5) out.push(b3);
    i += len;
  }
  return Buffer.from(out);
}

const buf = fs.readFileSync("тоерия/01_Исследование_QURT.pdf");
const str = buf.toString("latin1");
const outDir = path.resolve("scripts/extracted_photos");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
let match: RegExpExecArray | null;
let index = 0;
while ((match = streamRegex.exec(str)) !== null) {
  const content = match[1];
  if (content.length > 50000) { // image streams are > 100k
    index++;
    const decoded = decodeAscii85(content);
    fs.writeFileSync(path.join(outDir, `photo_${index}.jpg`), decoded);
    console.log(`Saved photo_${index}.jpg (${decoded.length} bytes)`);
  }
}
console.log(`Extracted ${index} shelf photos!`);
