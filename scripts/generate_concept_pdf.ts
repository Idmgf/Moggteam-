import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 2. Описание концепции — проект QURT</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
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
      font-size: 9.5pt;
      line-height: 1.4;
    }
    .page {
      page-break-after: always;
      height: 100%;
      min-height: 268mm;
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
      margin-bottom: 12px;
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
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      margin: 12px 0 6px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 14px;
      background: #0861C6;
      border-radius: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
      font-size: 8.5pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 9px;
      text-align: left;
      vertical-align: middle;
    }
    th {
      background-color: #0861C6;
      color: #ffffff;
      font-weight: 600;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .highlight-box {
      background: #eff6ff;
      border-left: 4px solid #0861C6;
      border-radius: 4px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 9pt;
      line-height: 1.45;
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

  <!-- СТРАНИЦА 1: ТАБЛИЦА 2.1 КОНЦЕПЦИЯ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 2. Описание концепции — проект QURT</h1>
          <span class="badge">AI Design Hackathon 2.0 · 2026</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Копчёный курт · Раздел 4 ТЗ Партнёра</div>
      </div>

      <div class="section-title">Таблица 2.1. Концепция</div>
      <table>
        <thead>
          <tr>
            <th style="width: 28%;">Пункт по ТЗ</th>
            <th style="width: 72%;">Ответ команды и обоснование решения</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Название проекта</strong></td>
            <td><strong>QURT · TAMYR POP (Гормолзавод Көкшетау)</strong></td>
          </tr>
          <tr>
            <td><strong>Идея (2–3 предложения)</strong></td>
            <td>
              Традиционный казахский копчёный курт переосмыслен как трендовый, богатый белком снек для активной аудитории (к чаю, на учёбу, в офис и автопутешествия) в удобном герметичном дой-паке с zip-замком.<br>
              Упаковка служит прямой точкой входа в цифровую промо-экосистему <strong>TAMYR POP</strong>: покупатель сканирует QR-код, регистрирует уникальный промокод из пачки и попадает в накопительную программу лояльности завода.
            </td>
          </tr>
          <tr>
            <td><strong>Целевая аудитория</strong></td>
            <td>
              1. <strong>Молодёжь и студенты (16–28 лет)</strong>: здоровый высокобелковый снек (60% протеина) вместо чипсов и сухариков; интерес к интерактиву и розыгрышам по QR.<br>
              2. <strong>Семьи и ценители традиций</strong>: качественный молочный продукт с доверием к бренду «Гормолзавод» (с 1965 года).<br>
              3. <strong>Туристы и гости Казахстана</strong>: стильный аутентичный гастрономический сувенир с современным европейским дизайном.
            </td>
          </tr>
          <tr>
            <td><strong>УТП (одно предложение)</strong></td>
            <td>
              <strong>Натуральный копчёный курт от легендарного завода «Гормолзавод Көкшетау» из двух чистых ингредиентов (творог и соль, 60 г белка) в закрывающемся дой-паке с zip-замком, где каждая пачка открывает доступ к подаркам через сервис TAMYR POP.</strong>
            </td>
          </tr>
          <tr>
            <td><strong>Формат: масса нетто, тип тары, размеры</strong></td>
            <td>
              • <strong>Масса нетто: 100 г</strong> (~8–9 шариков по 11–12 г; оптимальная порция в рамках ТЗ 20–1000 г).<br>
              • <strong>Тип тары</strong>: Трёхшовный устойчивый пакет <strong>дой-пак (doy-pack)</strong> с zip-lock замком и еврослотом для подвеса из жиронепроницаемого барьерного ламината (матовый ПЭТ / ПЭ 100 мкм по п. 5.2 стандарта).<br>
              • <strong>Размеры</strong>: 130 мм (ширина) × 200 мм (высота) + круглое донное расширение (35+35 мм).
            </td>
          </tr>
          <tr>
            <td><strong>Фирменный стиль: цвета, шрифты и элементы</strong></td>
            <td>
              • <strong>Цвета (брендбук 2026)</strong>: Основной кобальтовый синий (<strong>#0861C6</strong> — 35%), фоновый тёплый айвори (<strong>#FCF8F3</strong> — 30%), небесный акцент (<strong>#A4CFFF</strong> — 15%), глубокий синий (<strong>#1D3484</strong> — 10%), тёплый оттенок копчения (до 10%).<br>
              • <strong>Шрифты</strong>: Акцидентные заголовки — <em>Futura Now / AMRYS / Manrope</em>; технический текст маркировки — <em>Open Sans</em>.<br>
              • <strong>Графика</strong>: Фирменный элемент «горы» из логотипа завода, тонкий лаконичный орнамент-бордюр.
            </td>
          </tr>
          <tr>
            <td><strong>Как показано, что курт копчёный</strong></td>
            <td>
              1. Крупное контрастное наименование: <strong>«Құрт ысталған / Курт копчёный»</strong> на лицевой плашке.<br>
              2. <strong>Прозрачное круглое окно (Ø 62 мм)</strong>: покупатель сразу видит аппетитный янтарно-золотистый цвет копчения натурального продукта.<br>
              3. Деликатная стилизованная графика дыма вокруг окна (не более 10% площади) без визуального шума.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 2. Описание концепции · Страница 1 из 2</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: ТАБЛИЦА 2.2 СРАВНЕНИЕ С КОНКУРЕНТАМИ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 2.2. Сравнение с конкурентами (Раздел 4.10 ТЗ)</h1>
          <span class="badge">Конкурентное преимущество</span>
        </div>
        <div class="subtitle">Сопоставление упаковки QURT Гормолзавод с ключевыми конкурентами полевого исследования полок</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 14%;">Параметр</th>
            <th style="width: 25%; background-color: #034694;">Наша упаковка (QURT Гормолзавод)</th>
            <th style="width: 20%;">Конкурент 1 (Село Лесное)</th>
            <th style="width: 21%;">Конкурент 2 (ЭкоДом-Павлодар)</th>
            <th style="width: 20%;">Конкурент 3 («Айс»)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Масса и цена</strong></td>
            <td><strong>100 г · 650 тг</strong><br>(650 тг за 100 г)</td>
            <td>80 г · 420 тг<br>(525 тг за 100 г)</td>
            <td>50 г · 380–450 тг<br>(760–900 тг за 100 г)</td>
            <td>70 г · 395 тг<br>(564 тг за 100 г)</td>
          </tr>
          <tr>
            <td><strong>Тип тары</strong></td>
            <td><strong>Устойчивый дой-пак с zip-замком</strong> и еврослотом (многократное открытие, барьерный матовый ламинат)</td>
            <td>Мягкий вакуумный пакет (одноразовый, рвётся при вскрытии)</td>
            <td>Простой прозрачный полимерный вакуумный пакет / крафт-коробка</td>
            <td>Флоу-пак пакет с вырубным отверстием (без zip-замка)</td>
          </tr>
          <tr>
            <td><strong>Дизайн и цвета</strong></td>
            <td><strong>Глубокий синий матовый (#0861C6)</strong>, кремовые плашки, крупная типографика «QURT», считывается с 2 метров</td>
            <td>Небесно-голубой и зелёный фон, фигура спортсмена, пейзаж фермы (перегружен)</td>
            <td>Прозрачный невзрачный пакет с мелкой белой наклейкой («кустарный» вид)</td>
            <td>Золотистый металлик, сине-красные элементы, иллюстрация девушки</td>
          </tr>
          <tr>
            <td><strong>Продукт виден</strong></td>
            <td><strong>Да</strong> (центральное круглое окно 62 мм, видна золотистая текстура)</td>
            <td>Да (прямоугольное окно)</td>
            <td>Да (100% прозрачность пакета)</td>
            <td>Да (небольшое окно)</td>
          </tr>
          <tr>
            <td><strong>Промо / QR</strong></td>
            <td><strong>Да (QR 22×22 мм)</strong>: вход в сервис TAMYR POP, код внутри, накопительные уровни</td>
            <td>Нет (элементы взаимодействия отсутствуют)</td>
            <td>Нет (обычный товарный штрихкод)</td>
            <td>Нет (промо-механики нет)</td>
          </tr>
          <tr>
            <td><strong>Наше ключевое отличие</strong></td>
            <td>
              • <strong>Свободная ниша копчёного вкуса</strong>.<br>
              • <strong>Удобный дой-пак с zip-замком</strong>.<br>
              • <strong>Цифровая промо-платформа TAMYR POP</strong> собирает данные и удерживает клиента.
            </td>
            <td>У нас есть zip-замок, статусная лаконичная эстетика завода и цифровая промо-система.</td>
            <td>У нас премиальный фабричный бренд, читаемая полиграфия и программа лояльности вместо кустарной наклейки.</td>
            <td>У нас строгий современный стиль без архаичных псевдо-национальных клише и прямая связь с CRM.</td>
          </tr>
        </tbody>
      </table>

      <div class="highlight-box">
        <div style="font-weight: 700; color: #1e3a8a; font-size: 10pt; margin-bottom: 4px;">Синхронизация упаковки и цифрового сервиса TAMYR POP:</div>
        <div style="font-size: 8.5pt; color: #334155;">
          Упаковка и цифровая промо-механика разработаны как неразрывное единое решение (согласно п. 1 ТЗ):<br>
          1. <strong>Физическая точка входа</strong>: QR-код на упаковке ведёт на мобильное веб-приложение <code>TAMYR POP</code>, разработанное на Next.js 15, оптимизированное для мгновенного отклика на смартфонах.<br>
          2. <strong>Защита и безопасность</strong>: Уникальный буквенно-цифровой промокод напечатан на внутренней стороне пачки. Код валидируется криптографическим алгоритмом HMAC-SHA-256 в serializable-транзакции PostgreSQL, предотвращая дубликаты и подбор.<br>
          3. <strong>Пожизненная ценность клиента (LTV)</strong>: Каждый код конвертируется в баллы, гарантированные фирменные подарки и участие в розыгрышах, стимулируя систематические повторные покупки в ритейле.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 2. Описание концепции · Страница 2 из 2</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for Material 2 Concept...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("02_Концепция_QURT_Гормолзавод.pdf");
  const targetPdfTheory = path.resolve("тоерия/02_Концепция_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "02_Концепция_QURT_Гормолзавод.pdf");

  console.log("Rendering A4 Portrait PDF for Concept...");
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      right: "16mm",
      bottom: "14mm",
      left: "16mm"
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
  console.log("Done! Material 2 Concept PDF successfully created.");
}

run().catch(err => {
  console.error("Error generating concept PDF:", err);
  process.exit(1);
});
