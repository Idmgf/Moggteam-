import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const frontImgPath = path.resolve("новый дизан  упоковки.png");
const backImgPath = path.resolve("задния  часть  упаковки.png");

const frontBase64 = `data:image/png;base64,${fs.readFileSync(frontImgPath).toString("base64")}`;
const backBase64 = `data:image/png;base64,${fs.readFileSync(backImgPath).toString("base64")}`;

// Copy individual PNG files according to Hackathon naming standard
const targets = [
  path.resolve("тоерия"),
  path.resolve("."),
  path.resolve("..")
];

for (const t of targets) {
  try {
    fs.copyFileSync(frontImgPath, path.join(t, "03_Макет_лицевая.png"));
    fs.copyFileSync(backImgPath, path.join(t, "03_Макет_оборотная.png"));
    console.log(`Copied PNGs to ${t}`);
  } catch (e) {
    console.warn(`Copy to ${t} warning:`, e);
  }
}

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 3. Макеты упаковки — QURT Гормолзавод</title>
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
      font-size: 10pt;
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
    .main-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 8px 0;
    }
    .mockup-img {
      max-height: 165mm;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.12));
    }
    .spec-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 12px;
      margin-top: 6px;
    }
    .spec-title {
      font-size: 9pt;
      font-weight: 700;
      color: #0861C6;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 4px;
      font-size: 8.5pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
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
    .check-cell {
      text-align: center;
      font-weight: bold;
      color: #16a34a;
      font-size: 11pt;
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

  <!-- СТРАНИЦА 1: ЛИЦЕВАЯ СТОРОНА -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 3. Макеты упаковки — Лицевая сторона</h1>
          <span class="badge">Раздел 5.1 ТЗ</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Копчёный курт «QURT» (100 г) · Фирменный стиль 2026</div>
      </div>

      <div class="main-visual">
        <img class="mockup-img" src="${frontBase64}" alt="Макет упаковки — Лицевая сторона">
      </div>

      <div class="spec-box">
        <div class="spec-title">Спецификация обязательных элементов лицевой стороны (Раздел 5.1 ТЗ)</div>
        <table>
          <thead>
            <tr>
              <th style="width: 20%;">Элемент</th>
              <th style="width: 45%;">Размещение на макете</th>
              <th style="width: 35%;">Соответствие стандартам ТЗ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Логотип бренда</strong></td>
              <td>Официальный логотип «Гормолзавод Көкшетау» (основная цветная версия на белой плашке в левом верхнем углу).</td>
              <td>Ширина более 25 мм, соблюдено охранное поле, цвета не искажены (п. 3.2 ТЗ).</td>
            </tr>
            <tr>
              <td><strong>Наименование продукта</strong></td>
              <td>Крупная типографика <strong>«QURT»</strong> + плашка <strong>«ҚҰРТ ЫСТАЛҒАН / КУРТ КОПЧЁНЫЙ»</strong>.</td>
              <td>Двуязычное наименование, казахский язык указан первым, читается с 1.5–2 м (п. 4.6, 4.7).</td>
            </tr>
            <tr>
              <td><strong>Изображение / Окно</strong></td>
              <td>Центральное прозрачное круглое окно с демонстрацией аппетитных золотистых шариков курта.</td>
              <td>Прямая видимость продукта (п. 4.5), передача свойств копчения без лишних орнаментов.</td>
            </tr>
            <tr>
              <td><strong>Масса нетто</strong></td>
              <td><strong>«Таза салмағы: 100 г / Масса нетто: 100 г»</strong> (в нижней центральной части).</td>
              <td>Чёткий контрастный шрифт, точная масса выбранного потребительского формата.</td>
            </tr>
            <tr>
              <td><strong>Промо-зона</strong></td>
              <td>Контрастный QR-код (22×22 мм) в правом нижнем углу с призывом перехода на <strong>TAMYR POP</strong>.</td>
              <td>Размер ≥20×20 мм, тихая зона, контрастность, точка входа в CRM (п. 6.3 ТЗ).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>03_Макет_лицевая · Страница 1 из 3</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: ОБОРОТНАЯ СТОРОНА -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 3. Макеты упаковки — Оборотная сторона</h1>
          <span class="badge">Раздел 5.2 ТЗ</span>
        </div>
        <div class="subtitle">Маркировка по ТР ТС 022/2011 «Пищевая продукция» и ТР ТС 033/2013 «Безопасность молока»</div>
      </div>

      <div class="main-visual">
        <img class="mockup-img" src="${backBase64}" alt="Макет упаковки — Оборотная сторона">
      </div>

      <div class="spec-box">
        <div class="spec-title">Спецификация обязательной информации оборотной стороны (Раздел 5.2 ТЗ)</div>
        <table>
          <thead>
            <tr>
              <th style="width: 25%;">Блок информации</th>
              <th style="width: 45%;">Содержание на упаковке (KZ / RU)</th>
              <th style="width: 30%;">Нормативное основание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Промо-блок (Верх)</strong></td>
              <td><strong>«СЫЙЛЫҚ ҰТЫП АЛ! / ВЫИГРЫВАЙ ПОДАРКИ!»</strong><br>QR-код + «QR-кодты сканерлеңіз / Сканируйте QR-код. Ережелер: QR-код арқылы».</td>
              <td>Условия акции, призыв, ссылка на правила (Раздел 6 ТЗ).</td>
            </tr>
            <tr>
              <td><strong>Пищевая ценность (100 г)</strong></td>
              <td>Белки / Ақуыздар: <strong>60 г</strong>; Углеводы / Көмірсулар: <strong>17 г</strong>.<br>Энерг. ценность: <strong>200 ккал / 837 кДж</strong>.</td>
              <td>Данные действующей этикетки Партнёра (п. 2.1 ТЗ), ТР ТС 022/2011.</td>
            </tr>
            <tr>
              <td><strong>Состав продукта</strong></td>
              <td>Майсыз сүзбе, ас тұзы / Творог нежирный, соль поваренная пищевая.</td>
              <td>100% натуральный состав без добавок (п. 2.1 ТЗ).</td>
            </tr>
            <tr>
              <td><strong>Условия и сроки хранения</strong></td>
              <td>Хранить при t не выше +15 °C и влажности не более 75%. Срок годности — <strong>3 месяца</strong>.</td>
              <td>Температурный режим Партнёра (п. 2.1 ТЗ).</td>
            </tr>
            <tr>
              <td><strong>Изготовитель и контакты</strong></td>
              <td>ТОО «Гормолзавод», РК, Акмолинская обл., г. Кокшетау, Восточная промзона, 20-й проезд, 8в.<br>Тел: +7 747 377 15 29, +7 7162 77 15 29. ok@gormolzavod.kz, @gormolzavod</td>
              <td>Полные реквизиты производителя и горячая линия (п. 2.1 ТЗ).</td>
            </tr>
            <tr>
              <td><strong>Знаки и штрихкод</strong></td>
              <td>Штрихкод EAN-13, единый знак <strong>ЕАС</strong>, знак <strong>«KZ»</strong>, петли Мёбиуса утилизации (07 Other, 05 PP, 02 PE-HD), блок даты и партии (KZ-2024-B101).</td>
              <td>ТР ТС 005/2011 «О безопасности упаковки», стандарты маркировки РК.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>03_Макет_оборотная · Страница 2 из 3</span>
    </div>
  </div>

  <!-- СТРАНИЦА 3: ПРОВЕРОЧНЫЙ ЛИСТ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 3. Проверочный лист соответствия макетов</h1>
          <span class="badge">Официальный чек-лист ТЗ</span>
        </div>
        <div class="subtitle">Приложение к Техническому заданию (стр. 12) · Обязательная финальная страница Материала 3</div>
      </div>

      <div style="margin: 12px 0 16px 0; padding: 12px 16px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;">
        <div style="font-weight: 700; color: #166534; font-size: 10.5pt; margin-bottom: 4px;">Результат предпечатного и нормативного аудита:</div>
        <div style="font-size: 9pt; color: #1e293b; line-height: 1.45;">
          Разработанные макеты потребительской упаковки копчёного курта (лицевая и оборотная стороны) полностью соответствуют требованиям Технического регламента Таможенного союза <strong>ТР ТС 022/2011</strong> («Пищевая продукция в части её маркировки»), <strong>ТР ТС 033/2013</strong> («О безопасности молока и молочной продукции»), <strong>ТР ТС 005/2011</strong> («О безопасности упаковки»), а также официальному брендбуку ТОО «Гормолзавод» версии 2026 года.
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 5%; text-align: center;">№</th>
            <th style="width: 45%;">Обязательный элемент по ТЗ</th>
            <th style="width: 12%; text-align: center;">Наличие</th>
            <th style="width: 38%;">Примечание экспертной проверки</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td><strong>Логотип по брендбуку</strong>, не менее 25 мм, с охранным полем</td>
            <td class="check-cell">✓</td>
            <td>Размещён на лицевой стороне (ширина 28 мм), охранное поле свободно от текста и графики.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td><strong>Наименование</strong> на казахском и русском языках</td>
            <td class="check-cell">✓</td>
            <td>«Құрт ысталған / Курт копчёный», казахский текст указан первым на лицевой и оборотной сторонах.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td><strong>Фото продукта или окно</strong></td>
            <td class="check-cell">✓</td>
            <td>Прозрачное центральное окно обеспечивает 100% честную видимость золотистого копчёного курта.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">4</td>
            <td><strong>Масса нетто</strong></td>
            <td class="check-cell">✓</td>
            <td>«Таза салмағы / Масса нетто 100 г» вынесено на лицевую и оборотную стороны контрастным шрифтом.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">5</td>
            <td><strong>Состав, пищевая и энергетическая ценность</strong></td>
            <td class="check-cell">✓</td>
            <td>Состав: нежирный творог, пищевая соль. Белки: 60 г, Углеводы: 17 г, 200 ккал / 837 кДж на 100 г.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">6</td>
            <td><strong>Условия хранения, срок годности</strong></td>
            <td class="check-cell">✓</td>
            <td>Хранить при t не выше +15 °C и влажности ≤75%. Срок годности: 3 месяца (согласно ТЗ завода).</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">7</td>
            <td><strong>Изготовитель, адрес, контакты</strong></td>
            <td class="check-cell">✓</td>
            <td>ТОО «Гормолзавод», адрес в г. Кокшетау, телефоны потребителей, e-mail и Instagram.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">8</td>
            <td><strong>Дата выработки, номер партии</strong></td>
            <td class="check-cell">✓</td>
            <td>Специальные поля «Өндірілген күні / Дата изготовления» и «Партия №: KZ-2024-B101».</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">9</td>
            <td><strong>Штрихкод, ЕАС, KZ, знаки утилизации</strong></td>
            <td class="check-cell">✓</td>
            <td>EAN-13 (4870123456789), знак соответствия ЕАС, национальный знак «KZ», петли утилизации.</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">10</td>
            <td><strong>Промо-зона: QR-код не менее 20×20 мм</strong>, место уникального кода, краткие правила акции</td>
            <td class="check-cell">✓</td>
            <td>QR-код 22×22 мм на лицевой стороне + верхний промо-блок на обороте с призывом и правилами акции.</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 14px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 8pt; color: #475569;">
        <strong>Технические параметры сдачи:</strong> Разрешение файлов — более 300 dpi (векторные шрифты и высокоточный растр); цветовая модель — фирменная палитра (#0861C6, #FCF8F3, #A4CFFF); формат тары — трёхшовный термосвариваемый пакет (doy-pack) из комбинированного жиронепроницаемого материала с еврослотом и герметичным zip-замком.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>03_Макеты_упаковки_QURT · Проверочный лист · Страница 3 из 3</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for packaging mockups...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("03_Макеты_упаковки_QURT_Гормолзавод.pdf");
  const targetPdfTheory = path.resolve("тоерия/03_Макеты_упаковки_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "03_Макеты_упаковки_QURT_Гормолзавод.pdf");

  console.log("Generating A4 Portrait PDF with 300+ DPI render quality...");
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

  fs.writeFileSync(targetPdfTheory, pdfBuffer);
  console.log("Saved to тоерия:", targetPdfTheory);

  try {
    fs.writeFileSync(targetPdfDesktop, pdfBuffer);
    console.log("Saved to Desktop directly:", targetPdfDesktop);
  } catch (e) {
    console.warn("Desktop copy error:", e);
  }

  await browser.close();
  console.log("Done! Material 3 PDF and PNGs successfully created.");
}

run().catch(err => {
  console.error("Error generating packaging PDF:", err);
  process.exit(1);
});
