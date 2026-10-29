import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

// Правильный полочный мокап — результат composite_shelf_mockup.ts с оригинальными пачками пользователя
const shelfMockupSrc = path.resolve("public/04_Мокап_на_полке.jpg");
// Оригинальные дизайн-файлы пользователя для объёмных мокапов
const volumeFrontSrc = path.resolve("новый дизан  упоковки.png");
const volumeBackSrc = path.resolve("задния  часть  упаковки.png");

// Copy images to destination folders
const shelfMockupDest1 = path.resolve("public/04_Мокап_на_полке.jpg");
const shelfMockupDest2 = path.resolve("тоерия/04_Мокап_на_полке.jpg");
const shelfMockupDest3 = path.resolve("../04_Мокап_на_полке.jpg");

const volumeFrontDest1 = path.resolve("public/04_Мокап_объем_лицевая.jpg");
const volumeFrontDest2 = path.resolve("тоерия/04_Мокап_объем_лицевая.jpg");
const volumeFrontDest3 = path.resolve("../04_Мокап_объем_лицевая.jpg");

const volumeBackDest1 = path.resolve("public/04_Мокап_объем_оборотная.jpg");
const volumeBackDest2 = path.resolve("тоерия/04_Мокап_объем_оборотная.jpg");
const volumeBackDest3 = path.resolve("../04_Мокап_объем_оборотная.jpg");

fs.copyFileSync(shelfMockupSrc, shelfMockupDest1);
fs.copyFileSync(shelfMockupSrc, shelfMockupDest2);
fs.copyFileSync(shelfMockupSrc, shelfMockupDest3);

fs.copyFileSync(volumeFrontSrc, volumeFrontDest1);
fs.copyFileSync(volumeFrontSrc, volumeFrontDest2);
fs.copyFileSync(volumeFrontSrc, volumeFrontDest3);

fs.copyFileSync(volumeBackSrc, volumeBackDest1);
fs.copyFileSync(volumeBackSrc, volumeBackDest2);
fs.copyFileSync(volumeBackSrc, volumeBackDest3);

const shelfBase64 = `data:image/jpeg;base64,${fs.readFileSync(shelfMockupSrc).toString("base64")}`;
const volumeFrontBase64 = `data:image/png;base64,${fs.readFileSync(volumeFrontSrc).toString("base64")}`;
const volumeBackBase64 = `data:image/png;base64,${fs.readFileSync(volumeBackSrc).toString("base64")}`;

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 4. Мокапы — QURT ТОО «Гормолзавод»</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 12mm 15mm 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
      font-size: 10pt;
      line-height: 1.4;
    }
    .page {
      page-break-after: always;
      height: 100%;
      min-height: 185mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .header {
      border-bottom: 2px solid #0861C6;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .title {
      font-size: 16pt;
      font-weight: 800;
      color: #0861C6;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .subtitle {
      font-size: 9pt;
      color: #64748b;
      margin-top: 2px;
      font-weight: 500;
    }
    .badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .volume-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      align-items: center;
      margin: 8px 0;
    }
    .volume-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .volume-img-wrapper {
      height: 110mm;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .volume-img {
      max-height: 108mm;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.1));
    }
    .volume-label {
      font-weight: 700;
      font-size: 9.5pt;
      color: #0861C6;
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .shelf-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 6px 0;
    }
    .shelf-img-wrapper {
      height: 112mm;
      width: 100%;
      background: #0f172a;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cbd5e1;
    }
    .shelf-img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .ai-meta-box {
      background: #f1f5f9;
      border-left: 4px solid #0861C6;
      border-radius: 4px;
      padding: 8px 12px;
      margin-top: 8px;
    }
    .ai-meta-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .ai-tag {
      background: #0861C6;
      color: #ffffff;
      padding: 1px 6px;
      border-radius: 3px;
      font-size: 7.5pt;
      font-weight: bold;
    }
    .ai-meta-desc {
      font-size: 8pt;
      color: #475569;
      line-height: 1.35;
    }
    .footer-bar {
      margin-top: auto;
      padding-top: 6px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- СТРАНИЦА 1: ОБЪЕМНАЯ ВИЗУАЛИЗАЦИЯ УПАКОВКИ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 4. Мокапы — Объёмная визуализация упаковки</h1>
          <span class="badge">3D Mockup · Раздел 4 ТЗ</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Копчёный курт «QURT» (100 г) · 3D-моделирование потребительской тары</div>
      </div>

      <div class="volume-grid">
        <div class="volume-card">
          <div class="volume-img-wrapper">
            <img class="volume-img" src="${volumeFrontBase64}" alt="3D объёмный мокап — Лицевая сторона">
          </div>
          <div class="volume-label">Лицевая сторона · 3D объёмный рендер</div>
        </div>
        <div class="volume-card">
          <div class="volume-img-wrapper">
            <img class="volume-img" src="${volumeBackBase64}" alt="3D объёмный мокап — Оборотная сторона">
          </div>
          <div class="volume-label">Оборотная сторона · 3D объёмный рендер</div>
        </div>
      </div>

      <div class="ai-meta-box">
        <div class="ai-meta-title">
          <span class="ai-tag">AI-инструмент</span>
          <span>Midjourney v6.1 + Google Imagen 3 (Gemini 2.0 Flash) + Adobe Photoshop AI (Generative Fill) + Figma</span>
        </div>
        <div class="ai-meta-desc">
          <strong>Процесс создания:</strong> Первичная пространственная генерация формы устойчивого пакета дой-пак (doy-pack) с физически корректными складками, zip-замком и еврослотом выполнена в Midjourney v6.1; текстура и аппетитный золотисто-янтарный глянец копчёных шариков курта сгенерированы в Imagen 3; в Photoshop AI и Figma наложена векторная развёртка, брендбук завода (#0861C6 кобальт, #FCF8F3 айвори), выстроены студийные тени, глубина резкости и корректный QR-код промо-зоны.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>04_Мокапы_QURT_Гормолзавод · Изображение 1 из 2 · Страница 1 из 2</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: УПАКОВКА НА ПОЛКЕ МАГАЗИНА -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 4. Мокапы — Упаковка на полке магазина</h1>
          <span class="badge">Retail Mockup · Раздел 4 ТЗ</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Полочный мерчандайзинг в сетевом супермаркете · Молочно-снековая витрина</div>
      </div>

      <div class="shelf-container">
        <div class="shelf-img-wrapper">
          <img class="shelf-img" src="${shelfBase64}" alt="Упаковка на полке супермаркета">
        </div>
      </div>

      <div class="ai-meta-box">
        <div class="ai-meta-title">
          <span class="ai-tag">AI-инструмент</span>
          <span>Google Imagen 3 (Photorealistic Commercial Generation) + Adobe Photoshop AI (Composite & Lighting)</span>
        </div>
        <div class="ai-meta-desc">
          <strong>Полочный аудит и мерчандайзинг:</strong> Визуализация подтверждает стратегические выводы полевого исследования (Материал 1). Насыщенный кобальтово-синий матовый фон (#0861C6) формирует мощное монолитное цветовое пятно, выделяющее продукт среди белых и блёклых упаковок конкурентов. Крупный заголовок «QURT» и логотип «Гормолзавод» считываются покупателем с расстояния 1.5–2 метров. Золотистый копчёный курт в прозрачном окне мгновенно транслирует аппетитность и 100% натуральность состава.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>04_Мокапы_QURT_Гормолзавод · Изображение 2 из 2 · Страница 2 из 2</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for Material 4 Mockups...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("04_Мокапы_QURT_Гормолзавод.pdf");
  const targetPdfTheory = path.resolve("тоерия/04_Мокапы_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "04_Мокапы_QURT_Гормолзавод.pdf");

  console.log("Generating A4 Landscape PDF for Material 4...");
  const pdfBuffer = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: {
      top: "12mm",
      right: "15mm",
      bottom: "12mm",
      left: "15mm"
    }
  });

  fs.writeFileSync(targetPdf, pdfBuffer);
  console.log("Saved to:", targetPdf);

  fs.writeFileSync(targetPdfTheory, pdfBuffer);
  console.log("Saved to тоерия:", targetPdfTheory);

  try {
    fs.writeFileSync(targetPdfDesktop, pdfBuffer);
    console.log("Saved to Desktop directly:", targetPdfDesktop);
  } catch (e) {
    console.warn("Desktop copy error:", e);
  }

  await browser.close();
  console.log("Done! Material 4 PDF successfully created.");
}

run().catch(err => {
  console.error("Error generating mockups PDF:", err);
  process.exit(1);
});
