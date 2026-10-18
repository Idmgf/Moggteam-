import { mkdir, writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const url = process.argv[2];
if (!url) throw new Error("Usage: npm run qr -- https://YOUR-DOMAIN.kz/");
const parsed = new URL(url);
if (parsed.protocol !== "https:") throw new Error("Use an HTTPS URL for the print QR code.");
await mkdir("public/qr", { recursive: true });
const svg = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "M", margin: 4, color: { dark: "#1D3484", light: "#FCF8F3" } });
await writeFile("public/qr/tamyr-pop.svg", svg, "utf8");
console.info("Created public/qr/tamyr-pop.svg");
