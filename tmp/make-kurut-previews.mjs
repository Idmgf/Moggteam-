import sharp from "sharp";

const pieces = [
  ["курт копченый ори.png", 375, 216, 100, 125],
  ["курт копченый ори.png", 573, 249, 110, 110],
  ["курт копченый ори.png", 900, 167, 125, 108],
  ["курт копченый ори 2.png", 206, 176, 118, 100],
  ["курт копченый ори 2.png", 674, 199, 106, 102],
  ["курт копченый ори 2.png", 507, 217, 102, 115],
];
await Promise.all(pieces.map(async ([file, centerX, centerY, maskX, maskY], index) => {
  const shiftedMask = await sharp(Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136"><circle cx="68" cy="68" r="65" fill="white"/></svg>',
  )).blur(1).png().toBuffer();
  const cutout = sharp(file)
    .extract({ left: centerX - 90, top: centerY - 90, width: 180, height: 180 })
    .resize(220, 220)
    .extract({ left: maskX - 68, top: maskY - 68, width: 136, height: 136 })
    .composite([{ input: shiftedMask, blend: "dest-in" }])
    ;
  await Promise.all([
    cutout.clone().png().toFile(`tmp/kurut-ball-preview-${index}.png`),
    cutout.clone().webp({ quality: 90, effort: 5 }).toFile(`public/qurt/ball-${index + 1}.webp`),
  ]);
}));
console.log("Replaced the six ball assets with transparent photo cutouts.");