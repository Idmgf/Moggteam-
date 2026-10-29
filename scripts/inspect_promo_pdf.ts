import fs from "node:fs";

const buf = fs.readFileSync("тоерия/05_Промо-механика_QURT.pdf");
const str = buf.toString("latin1");
console.log("Length:", str.length);
// Search for visible strings or streams
const regex = /\(([^\(\)\\]+)\)/g;
let m: RegExpExecArray | null;
const texts: string[] = [];
while ((m = regex.exec(str)) !== null) {
  if (m[1].length > 2) texts.push(m[1]);
}
console.log("Total text fragments:", texts.length);
console.log("Sample text:", texts.slice(0, 30).join(" | "));
