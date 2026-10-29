import fs from "node:fs";

const buf = fs.readFileSync("тоерия/01_Исследование_QURT.pdf");
const str = buf.toString("latin1");
const regex = /<<[^>]*\/Subtype\s*\/Image[^>]*>>/g;
let m: RegExpExecArray | null;
while ((m = regex.exec(str)) !== null) {
  console.log("Image dict:", m[0]);
}
