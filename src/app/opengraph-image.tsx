import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "QURT от ГОРМОЛЗАВОД";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const pack = await readFile(join(process.cwd(), "public/qurt/pack-front.png"));
  const packSrc = `data:image/png;base64,${pack.toString("base64")}`;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "space-between", padding: "56px 76px", color: "white", background: "linear-gradient(120deg, #0a52e8, #063bb5)" }}>
      <div style={{ display: "flex", width: 650, flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
        <span style={{ marginBottom: 28, fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>ГОРМОЛЗАВОД · КӨКШЕТАУ</span>
        <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05 }}>Дәмді сәттер — жаңа деңгейге жол.</span>
        <span style={{ marginTop: 28, fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>QURT · ҚҰРТ · ЫСТАЛҒАН</span>
      </div>
      <img src={packSrc} width="400" height="400" alt="Упаковка QURT" style={{ objectFit: "contain" }} />
    </div>,
    { ...size },
  );
}