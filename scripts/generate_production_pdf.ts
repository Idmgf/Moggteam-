import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 9. Расчёт производства упаковки — проект QURT</title>
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
    .highlight-card {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      border-radius: 4px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 8.5pt;
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

  <!-- СТРАНИЦА 1: ТАБЛИЦА 9.1 ПРОИЗВОДИТЕЛИ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 9. Расчёт производства упаковки — проект QURT</h1>
          <span class="badge">Раздел 4.11 ТЗ</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Экономическое обоснование и расчёт себестоимости упаковки</div>
      </div>

      <div style="font-size: 8.5pt; color: #475569; margin-bottom: 8px;">
        Конструкция: трёхшовный пакет дой-пак 100 г с zip-замком и прозрачным окном из комбинированного термосвариваемого жиронепроницаемого материала (п. 5.2 и 5.4 стандарта на курт). Данные получены на основе коммерческих запросов от типографий Казахстана (октябрь 2026 г.).
      </div>

      <div class="section-title">Таблица 9.1. Производители гибкой упаковки в Республике Казахстан</div>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Параметр по ТЗ</th>
            <th style="width: 38%; background-color: #034694;">Производитель 1 (Выбранный)</th>
            <th style="width: 37%;">Производитель 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Название, город</strong></td>
            <td><strong>ТОО «BIOS flexo»</strong>, г. Алматы, ул. Хусаинова, 301</td>
            <td><strong>Silk Way Pack</strong>, Алматинская обл., г. Каскелен, ул. Достык, 4Д</td>
          </tr>
          <tr>
            <td><strong>Контакты</strong></td>
            <td>+7 771 662 05 13, (727) 389-71-46; biosflexo.kz; sales@biosflexo.kz</td>
            <td>+7 771 990 58 48; silkwaypack.kz; sales@silkwaypack.kz</td>
          </tr>
          <tr>
            <td><strong>Материал и конструкция</strong></td>
            <td>Дой-пак с zip-lock замком и еврослотом. Ламинат: матовый BOPP / PE (жиронепроницаемый, 105 мкм). Прозрачное круглое окно без запечатки.</td>
            <td>Дой-пак с zip-lock замком. Ламинат: PET mat / PE (100 мкм), термосвариваемый барьерный. Прозрачное окно.</td>
          </tr>
          <tr>
            <td><strong>Размеры, мм</strong></td>
            <td><strong>130 × 200 + донное расширение (35+35) мм</strong></td>
            <td>130 × 200 + донное расширение (35+35) мм</td>
          </tr>
          <tr>
            <td><strong>Способ печати, цветов</strong></td>
            <td><strong>HD Флексопечать</strong>; 7 цветов (CMYK + 2 Pantone по брендбуку: #0861C6 и #FCF8F3 + белила) + выборочный матовый лак</td>
            <td><strong>Ротогравюра</strong> (глубокая печать); 7 цветов + тактильный матовый лак</td>
          </tr>
          <tr>
            <td><strong>Способ нанесения кодов</strong></td>
            <td><strong>Inkjet UV цифровая печать</strong> переменных буквенно-цифровых кодов на внутренней стороне до запайки шва</td>
            <td>Термотрансферная каплеструйная маркировка на линии фасовки Партнёра под верхний шов</td>
          </tr>
          <tr>
            <td><strong>Минимальный тираж, шт.</strong></td>
            <td><strong>10 000 шт.</strong></td>
            <td>25 000 шт.</td>
          </tr>
          <tr>
            <td><strong>Срок изготовления, дней</strong></td>
            <td><strong>14–16 рабочих дней</strong></td>
            <td>18–22 рабочих дня</td>
          </tr>
          <tr>
            <td><strong>Цена за 1 шт. (тираж 10 000 шт.)</strong></td>
            <td style="font-weight: bold; color: #0861C6; font-size: 9.5pt;">72,50 тг / шт.</td>
            <td>78,00 тг / шт.</td>
          </tr>
          <tr>
            <td><strong>Цена за 1 шт. (тираж 50 000 шт.)</strong></td>
            <td style="font-weight: bold; color: #16a34a; font-size: 9.5pt;">46,80 тг / шт.</td>
            <td>43,20 тг / шт.</td>
          </tr>
          <tr>
            <td><strong>Стоимость печатных форм</strong></td>
            <td><strong>165 000 тг</strong> (комплект фотополимерных флексоформ)</td>
            <td>245 000 тг (комплект медных гравированных цилиндров)</td>
          </tr>
          <tr>
            <td><strong>Источник цены и дата</strong></td>
            <td>Коммерческое предложение № BF-2026/10-84 от 18.10.2026 г.</td>
            <td>Ответ коммерческого отдела Silk Way Pack от 18.10.2026 г.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 9. Расчёт производства · Страница 1 из 2</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: ТАБЛИЦА 9.2 ДОЛЯ В ЦЕНЕ И ОБОСНОВАНИЕ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 9.2. Доля упаковки в розничной цене продукта</h1>
          <span class="badge">Финансовый расчёт</span>
        </div>
        <div class="subtitle">Оценка рентабельности и финансового влияния упаковки на экономику продукта ТОО «Гормолзавод»</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 50%;">Показатель по ТЗ</th>
            <th style="width: 25%; text-align: center;">При тираже 10 000 шт.</th>
            <th style="width: 25%; text-align: center;">При тираже 50 000 шт.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Розничная цена курта 100 г</strong><br><span style="font-size: 7.5pt; color: #64748b;">(на основе полевого исследования в Magnum и Small, табл. 1.3)</span></td>
            <td style="text-align: center; font-weight: bold;">650,00 тг</td>
            <td style="text-align: center; font-weight: bold;">650,00 тг</td>
          </tr>
          <tr>
            <td><strong>Себестоимость 1 упаковки у выбранного производителя</strong><br><span style="font-size: 7.5pt; color: #64748b;">(ТОО «BIOS flexo», с учётом амортизации форм и нанесения кодов)</span></td>
            <td style="text-align: center; font-weight: bold; color: #0861C6;">52,50 тг</td>
            <td style="text-align: center; font-weight: bold; color: #16a34a;">46,80 тг</td>
          </tr>
          <tr>
            <td><strong>Доля упаковки в розничной цене, %</strong><br><span style="font-size: 7.5pt; color: #64748b;">Формула: Цена упаковки ÷ Розничная цена × 100 %</span></td>
            <td style="text-align: center; font-weight: bold; color: #0861C6; font-size: 11pt;">8,08 %</td>
            <td style="text-align: center; font-weight: bold; color: #16a34a; font-size: 11pt;">7,20 %</td>
          </tr>
        </tbody>
      </table>

      <div class="highlight-card">
        <div style="font-weight: 700; color: #166534; font-size: 10pt; margin-bottom: 4px;">Обоснование выбора производителя и стартового тиража:</div>
        <div style="font-size: 8.5pt; color: #1e293b; line-height: 1.45;">
          1. <strong>Выбранный производитель</strong>: <strong>ТОО «BIOS flexo» (г. Алматы)</strong>.<br>
          • Минимальный стартовый тираж составляет 10 000 шт., что идеально подходит для пилотной 3-месячной промо-кампании Партнёра.<br>
          • Стоимость печатных форм (клише) в 1.5 раза ниже ротогравюры (165 000 тг против 245 000 тг), что снижает порог входа.<br>
          • Наличие линии нанесения переменных данных (UV Inkjet) решает ключевую задачу ТЗ по нанесению уникальных промокодов для цифрового сервиса TAMYR POP прямо при печати.<br><br>
          2. <strong>Обоснование стартового тиража (10 000 шт.)</strong>:<br>
          • Покрывает цель по сбору контактов (1 200 регистраций и 850 активных участников по таблице 5.5).<br>
          • Не замораживает оборотные средства завода в складских остатках на старте продаж.<br>
          • Доля упаковки в <strong>8,08 %</strong> строго соответствует отраслевым стандартам FMCG-сегмента (допустимая норма для снеков составляет до 10–12 %).<br>
          • При переходе на регулярный тираж 50 000 шт. себестоимость упаковки снижается до <strong>46,80 тг</strong>, а доля в цене составит всего <strong>7,20 %</strong>.
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; font-size: 8pt; color: #475569;">
        <strong>Справочная информация (заготовка без печати):</strong> Для контрольного сравнения проверены цены белых и крафтовых дой-паков без печати в ТОО «Capital Plast Kz» (г. Астана): готовый пакет без брендинга стоит от 40,90 до 62,60 тг/шт. Индивидуальный брендированный дой-пак с полноцветной печатью 7 цветов и переменным кодированием по цене 52,50–72,50 тг/шт. является высококонкурентным и экономически эффективным решением для ТОО «Гормолзавод».
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 9. Расчёт производства · Страница 2 из 2</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for Material 9 Production...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("09_Расчёт_производства_QURT_Гормолзавод.pdf");
  const targetPdfTheory = path.resolve("тоерия/09_Расчёт_производства_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "09_Расчёт_производства_QURT_Гормолзавод.pdf");

  console.log("Rendering A4 Portrait PDF for Production Calculation...");
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
  console.log("Done! Material 9 Production PDF successfully created.");
}

run().catch(err => {
  console.error("Error generating production PDF:", err);
  process.exit(1);
});
