import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 7. Файл «Промпты» — проект QURT</title>
  <style>
    @page {
      size: A4 portrait;
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
      font-size: 8.5pt;
      line-height: 1.35;
    }
    .page {
      page-break-after: always;
      height: 100%;
      min-height: 270mm;
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
      font-size: 15pt;
      font-weight: 800;
      color: #0861C6;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .subtitle {
      font-size: 8.5pt;
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
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 8pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 7px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background-color: #0861C6;
      color: #ffffff;
      font-weight: 600;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .prompt-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 7pt;
      color: #334155;
      line-height: 1.3;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .tag-yes {
      display: inline-block;
      background: #dcfce7;
      color: #166534;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 7.5pt;
      text-align: center;
    }
    .tag-no {
      display: inline-block;
      background: #fee2e2;
      color: #991b1b;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 7.5pt;
      text-align: center;
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

  <!-- СТРАНИЦА 1: ПРОМПТЫ 1 - 3 -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 7. Файл «Промпты» — проект QURT</h1>
          <span class="badge">Раздел 7.3 ТЗ Партнёра</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Копчёный курт «QURT» · Таблица всех использованных AI-промптов</div>
      </div>

      <div style="font-size: 8pt; color: #475569; margin-bottom: 6px;">
        Каждый промпт сформирован по требованиям п. 7.2 ТЗ: содержит объект, ключевые детали, стиль, цвета, композицию, формат и исключения. Соответствующие скриншоты представлены в Материале 8.
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 3%; text-align: center;">№</th>
            <th style="width: 14%;">AI-инструмент</th>
            <th style="width: 48%;">Полный текст промпта</th>
            <th style="width: 23%;">Что получено</th>
            <th style="width: 6%; text-align: center;">В работе</th>
            <th style="width: 6%; text-align: center;">№ скрина</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td><strong>Claude 3.7 Sonnet / Cursor</strong></td>
            <td class="prompt-text">Ты senior frontend-разработчик и продуктовый дизайнер. Твоя задача — создать интерактивную, визуально премиальную веб-страницу промо-сервиса «TAMYR POP» для копчёного курта ТОО «Гормолзавод» (г. Кокшетау).
Стек: Next.js 15 App Router, TypeScript, Tailwind CSS 4, GSAP/Lenis анимации, PostgreSQL/Prisma.
Дизайн-система: цвета #0861C6 (кобальтовый синий), #FCF8F3 (айвори), #A4CFFF (небесный), шрифт Manrope.
Интерфейс: mobile-first, полная двуязычность KZ/RU (казахский по умолчанию).
Экраны:
1. Hero с 3D-эффектом пачки QURT, летающими шариками курта и кнопками входа.
2. Блок промо-механики (покупка → скан QR → регистрация за 45 сек → ввод кода из пачки → баллы).
3. Форма быстрой регистрации: 5 полей (телефон, имя, город, возрастная группа, код) + чекбокс согласия на сбор ПД по Закону РК.
4. Каталог наград с индикатором уровней (3, 5, 10 кодов).
5. Защита от подбора кодов через HMAC-SHA-256 и serializable транзакции.
Обеспечь Lighthouse Performance ≥ 85, WCAG AA контрастность.</td>
            <td>Полнофункциональный код промо-платформы TAMYR POP, адаптивная верстка, анимации, модули валидации кодов и регистрация.</td>
            <td style="text-align: center;"><span class="tag-yes">Да</span></td>
            <td style="text-align: center; font-weight: bold;">08_01</td>
          </tr>

          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td><strong>Google Gemini (Imagen 3)</strong></td>
            <td class="prompt-text">Front view studio product shot of a royal blue (#0861C6) matte stand-up doypack snack pouch on a neutral light-gray background. The blue pouch is decorated with subtle tone-on-tone Kazakh swirling ornament patterns. Along the bottom edge and corners is a distinct cream-white geometric Kazakh maze border. In the upper-left corner is a white rectangular label tag with a blue mountain emblem and logo 'ГОРМОЛЗАВОД КӨКШЕТАУ'. Across the upper part is giant, bold, tall white block typography spelling 'QURT'. Directly beneath it is a cream-colored ribbon banner with text 'ҚҰРТ ЫСТАЛҒАН' and 'КУРТ КОПЧЁНЫЙ'. In the center is a large round transparent window displaying golden-brown textured smoked curd balls (qurt). At the bottom center is a framed label reading 'Таза салмағы 100 г / Масса нетто 100 г'. In the bottom-right corner is a sharp high-contrast QR code with white margin. Sharp focus, clean commercial FMCG packaging mockup, 8k.</td>
            <td>Финальный 3D-макет лицевой стороны упаковки дой-пак (синий матовый фон, логотип завода, QURT, окно с продуктом, QR-код).</td>
            <td style="text-align: center;"><span class="tag-yes">Да</span></td>
            <td style="text-align: center; font-weight: bold;">08_02</td>
          </tr>

          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td><strong>Google Gemini (Imagen 3)</strong></td>
            <td class="prompt-text">Studio product mockup, flat straight-on back view of a food stand-up pouch (doypack packaging) for traditional dry cheese snack. The pouch body is vibrant bright royal cobalt blue (#0861C6), matching the exact bright blue color and lighting of the front package, decorated with soft tone-on-tone Kazakh ornamental wave patterns (#A4CFFF). Along the very bottom edge is a cream-colored traditional Kazakh geometric maze border. The back layout features clean, elegant off-white (#FCF8F3) and cream rectangular modular infoboxes with thin borders: at the top, a neat promo rules banner 'СЫЙЛЫҚ ҰТЫП АЛ! / ВЫИГРЫВАЙ ПОДАРКИ!' with QR code and instructions; in the middle, organized rectangular cards for dairy nutrition facts table (60g protein, 200 kcal), bilingual ingredients (cottage cheese, salt), storage conditions, and manufacturer details 'ТОО Гормолзавод, Кокшетау'; at the bottom, an EAN-13 barcode box, EAC mark, KZ quality mark, recycling icons 07/05/02, and a white box for the batch date stamp. Commercial packaging layout, ultra-sharp typography, photorealistic.</td>
            <td>Финальный макет оборотной стороны упаковки (все обязательные блоки маркировки ТР ТС 022/2011, ТР ТС 033/2013, промо-блок и реквизиты).</td>
            <td style="text-align: center;"><span class="tag-yes">Да</span></td>
            <td style="text-align: center; font-weight: bold;">08_03</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 7. Файл «Промпты» · Страница 1 из 2</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: ПРОМПТЫ 4 - 6 -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 7. Файл «Промпты» (продолжение)</h1>
          <span class="badge">Раздел 7.3 ТЗ Партнёра</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Промпты для мокапов, фуд-текстур и аналитических моделей</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 3%; text-align: center;">№</th>
            <th style="width: 14%;">AI-инструмент</th>
            <th style="width: 48%;">Полный текст промпта</th>
            <th style="width: 23%;">Что получено</th>
            <th style="width: 6%; text-align: center;">В работе</th>
            <th style="width: 6%; text-align: center;">№ скрина</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">4</td>
            <td><strong>Google Gemini (Imagen 3)</strong></td>
            <td class="prompt-text">Create a high-resolution, photorealistic studio product photograph of a single standing resealable doypack pouch containing traditional Kazakh kurt (QURT). Deep cobalt-blue packaging with a premium matte finish, ornamental patterns in cream and light blue. A small white manufacturer logo panel in the upper-left corner. Large cream-colored 'QURT' lettering, blue ribbon 'ҚҰРТ ЫСТАЛҒАН / ҚҰРТ КОПЧЁНЫЙ'. Circular transparent product window displaying realistic kurt balls.
Main modification: Make the QR code in the lower-right corner approximately 1.5–2 times larger than in standard design. Preserve surrounding ornamental patterns while adjusting layout. Ultra-realistic commercial product photography, 4K resolution, square 1:1 aspect ratio.</td>
            <td>Экспериментальный промежуточный вариант упаковки с увеличенным QR-кодом. Отклонён из-за смещения визуального баланса в пользу промпта № 2.</td>
            <td style="text-align: center;"><span class="tag-no">Нет</span></td>
            <td style="text-align: center; font-weight: bold;">08_04</td>
          </tr>

          <tr>
            <td style="text-align: center; font-weight: bold;">5</td>
            <td><strong>Google Imagen 3 (Commercial Retail)</strong></td>
            <td class="prompt-text">Photorealistic commercial product shot of the developed packaged product 'QURT' (smoked traditional Central Asian kurt snack by Gormolzavod Kokshetau) displayed on a brightly lit supermarket shelf.
Details: Modern stand-up doy-pack pouch standing upright on the eye-level shelf of a grocery supermarket (dairy/snack department). Package appearance: rich royal cobalt blue matte background (#0861C6), ivory traditional minimalist ornament framing, bold white letters 'QURT' with subtitle ribbon 'ҚҰРТ ЫСТАЛҒАН / КУРТ КОПЧЁНЫЙ', circular transparent window in center revealing appetizing golden-brown toasted spherical kurt balls, crisp QR code on lower corner. Setting: Modern supermarket shelf with price tag rail in front, soft store illumination, adjacent shelves displaying dairy/snack products with realistic blurred depth of field. Professional retail photography, 4k, crisp sharp focus on package.</td>
            <td>Реалистичный полочный мокап упаковки QURT на магазинной витрине супермаркета для Материала 4 (упаковка на полке магазина).</td>
            <td style="text-align: center;"><span class="tag-yes">Да</span></td>
            <td style="text-align: center; font-weight: bold;">08_05</td>
          </tr>

          <tr>
            <td style="text-align: center; font-weight: bold;">6</td>
            <td><strong>ChatGPT (GPT-4o) / DeepSeek</strong></td>
            <td class="prompt-text">Действуй как эксперт по торговому маркетингу и CRM в ритейле Казахстана.
На основе ТЗ Хакатона для копчёного курта ТОО «Гормолзавод» разработай:
1. Детальную CJM-карту пути покупателя из 5 шагов: от полки магазина и сканирования QR-кода на упаковке до повторной покупки.
2. Трёхуровневую механику вознаграждения (3, 5, 10 кодов) с гарантированными призами из продукции завода и розыгрышем главного тура в Бурабай при общем фонде 650 000 тг.
3. 3 сценария удержания покупателей через SMS-сообщения на двух языках (KZ и RU) в фирменном уважительном тоне Партнёра без спама и навязчивости.
4. Целевые показатели эффективности (KPI) на 3 месяца акции: регистрации, доля повторных покупок (не менее 45%), активные участники.</td>
            <td>Структура промо-механики, CJM-схема, тексты триггерных SMS-сообщений и расчет KPI для Материала 5.</td>
            <td style="text-align: center;"><span class="tag-yes">Да</span></td>
            <td style="text-align: center; font-weight: bold;">08_06</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 12px; padding: 10px 14px; background: #eff6ff; border-left: 4px solid #0861C6; border-radius: 4px; font-size: 8pt; color: #334155;">
        <strong>Соблюдение правил Хакатона:</strong> Включены 6 детализированных промптов (более обязательных 5 по ТЗ). Каждый промпт отражает поэтапную итерационную работу команды: от текстовой архитектуры сервиса и пространственного моделирования упаковки до ритейл-рендеров и CRM-логики.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 7. Файл «Промпты» · Страница 2 из 2</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for Material 7 Prompts...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("07_Файл_Промпты_QURT_Гормолзавод.pdf");
  const targetPdfTheory1 = path.resolve("тоерия/07_Файл_Промпты_QURT.pdf");
  const targetPdfTheory2 = path.resolve("тоерия/Промпты.pdf");
  const targetPdfDesktop = path.resolve("..", "07_Файл_Промпты_QURT_Гормолзавод.pdf");

  console.log("Rendering A4 Portrait PDF for Prompts...");
  const pdfBuffer = await page.pdf({
    format: "A4",
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

  fs.writeFileSync(targetPdfTheory1, pdfBuffer);
  fs.writeFileSync(targetPdfTheory2, pdfBuffer);
  console.log("Saved to тоерия:", targetPdfTheory1);

  try {
    fs.writeFileSync(targetPdfDesktop, pdfBuffer);
    console.log("Saved to Desktop directly:", targetPdfDesktop);
  } catch (e) {
    console.warn("Desktop copy error:", e);
  }

  await browser.close();
  console.log("Done! Material 7 Prompts PDF successfully created.");
}

run().catch(err => {
  console.error("Error generating prompts PDF:", err);
  process.exit(1);
});
