import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

function getBase64Image(filePath: string): string {
  const fileData = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${fileData.toString("base64")}`;
}

const photo1 = getBase64Image("scripts/extracted_photos/photo_1.jpg");
const photo2 = getBase64Image("scripts/extracted_photos/photo_2.jpg");
const photo3 = getBase64Image("scripts/extracted_photos/photo_3.jpg");
const photo4 = getBase64Image("scripts/extracted_photos/photo_4.jpg");
const photo5 = getBase64Image("scripts/extracted_photos/photo_5.jpg");
const photo6 = getBase64Image("scripts/extracted_photos/photo_6.jpg");

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 1. Отчёт о полевом исследовании — проект QURT</title>
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
      font-size: 11pt;
      line-height: 1.4;
    }
    .page {
      page-break-after: always;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .header {
      border-bottom: 2px solid #0861C6;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .title {
      font-size: 17pt;
      font-weight: 800;
      color: #0861C6;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .subtitle {
      font-size: 9.5pt;
      color: #64748b;
      margin-top: 4px;
      font-weight: 500;
    }
    .badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8.5pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #0f172a;
      margin: 12px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 15px;
      background: #0861C6;
      border-radius: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
      font-size: 9pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
      vertical-align: middle;
    }
    th {
      background-color: #0861C6;
      color: #ffffff;
      font-weight: 600;
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .note {
      font-size: 8pt;
      color: #64748b;
      font-style: italic;
      margin-top: 4px;
      line-height: 1.3;
    }
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 8px;
    }
    .photo-card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
    }
    .photo-wrapper {
      height: 310px;
      width: 100%;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .photo-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .photo-title {
      font-weight: 700;
      font-size: 9.5pt;
      color: #0861C6;
      margin: 6px 0 2px 0;
    }
    .photo-meta {
      font-size: 8pt;
      color: #475569;
      margin-bottom: 4px;
      font-weight: 600;
    }
    .photo-desc {
      font-size: 8pt;
      color: #334155;
      line-height: 1.3;
      flex-grow: 1;
    }
    .conclusion-row {
      margin-bottom: 8px;
    }
    .concl-badge {
      display: inline-block;
      background: #0861C6;
      color: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 8pt;
      margin-bottom: 2px;
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
    .highlight {
      font-weight: 600;
      color: #0f172a;
    }
    .price-tag {
      font-weight: 700;
      color: #0861C6;
    }
  </style>
</head>
<body>

  <!-- СТРАНИЦА 1: ТИТУЛ И ТАБЛИЦА 1.1 -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 1. Отчёт о полевом исследовании — проект QURT</h1>
          <span class="badge">AI Design Hackathon 2.0 · 2026</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Копчёный курт · Период полевого исследования: 15–18 октября 2026 г.</div>
      </div>

      <div class="section-title">Таблица 1.1. Торговые точки</div>
      <table>
        <thead>
          <tr>
            <th style="width: 4%;">№</th>
            <th style="width: 20%;">Название магазина</th>
            <th style="width: 26%;">Тип торговой точки</th>
            <th style="width: 25%;">Адрес</th>
            <th style="width: 12%;">Дата съёмки</th>
            <th style="width: 13%;">Номера фото</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td><strong>Magnum Daily</strong></td>
            <td>Сетевой супермаркет</td>
            <td>г. Астана, пр. Жеңіс, 55</td>
            <td>16.10.2026</td>
            <td style="color: #0861C6; font-weight: bold;">Фото 3, Фото 4</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td><strong>Small</strong></td>
            <td>Сетевой супермаркет</td>
            <td>г. Астана, пр. Жеңіс, 67</td>
            <td>16.10.2026</td>
            <td style="color: #0861C6; font-weight: bold;">Фото 1, Фото 2</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td><strong>Fermag (Фермерский гастроном)</strong></td>
            <td>Магазин у дома / фермерские продукты</td>
            <td>г. Астана, ул. Бейбітшілік, 25</td>
            <td>16.10.2026</td>
            <td style="color: #0861C6; font-weight: bold;">Фото 5, Фото 6</td>
          </tr>
        </tbody>
      </table>
      <div class="note">
        * Требование ТЗ Партнёра выполнено: исследовано не менее 3 торговых точек (2 сетевых супермаркета разного формата и 1 специализированный магазин у дома / локальный фермерский гастроном). Все точки расположены в активной торговой зоне Сарыаркинского района г. Астаны.
      </div>

      <div style="margin-top: 24px; padding: 14px; background: #eff6ff; border-left: 4px solid #0861C6; border-radius: 4px;">
        <div style="font-weight: 700; color: #1e3a8a; font-size: 10pt; margin-bottom: 6px;">Цель и контекст полевого исследования:</div>
        <div style="font-size: 8.5pt; color: #334155; line-height: 1.45;">
          Полевой аудит полок проведён с целью глубокого анализа фактической розничной выкладки курта, оценки визуальной конкуренции, ценовых коридоров (за 1 упаковку и в пересчёте на 100 г продукта), используемых упаковочных материалов, а также наличия интерактивных точек контакта (QR-кодов, промо-механик, программ лояльности).<br><br>
          <strong>Ключевая задача команды:</strong> выявить неудовлетворённые потребности покупателей и сформировать для копчёного курта ТОО «Гормолзавод» уникальное торговое предложение (УТП), выигрышную упаковку и бесшовный цифровой сервис <strong>TAMYR POP</strong>.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 1. Отчёт о полевом исследовании — Страница 1 из 5</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: ФОТОГРАФИИ ПОЛОК 1/2 -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 1.2. Фотографии полок (1/2)</h1>
          <span class="badge">Полевая фотофиксация</span>
        </div>
        <div class="subtitle">Фотографии полок с куртом и смежными снеками в торговых точках г. Астаны (не менее 6 фото по ТЗ)</div>
      </div>

      <div class="photos-grid">
        <!-- ФОТО 1 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo1}" alt="Фото 1">
          </div>
          <div class="photo-title">Фото 1 · Магазин «Small»</div>
          <div class="photo-meta">Адрес: г. Астана, пр. Жеңіс, 67 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>Село Лесное, «Құрт» (80 г)</strong>. Вакуумный полиэтиленовый пакет с прозрачным окном. На лицевой стороне крупное заявление «24 г белка в одной упаковке». Молочная витрина, средний ярус (уровень глаз).
          </div>
        </div>

        <!-- ФОТО 2 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo2}" alt="Фото 2">
          </div>
          <div class="photo-title">Фото 2 · Магазин «Small»</div>
          <div class="photo-meta">Адрес: г. Астана, пр. Жеңіс, 67 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>ЭкоДом-Павлодар, «Курт соленый с перцем» (50 г)</strong>. Полностью прозрачный вакуумный пакет с белой монохромной наклейкой. Молочная холодильная витрина, 2-й ярус.
          </div>
        </div>

        <!-- ФОТО 3 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo3}" alt="Фото 3">
          </div>
          <div class="photo-title">Фото 3 · Магазин «Magnum Daily»</div>
          <div class="photo-meta">Адрес: г. Астана, пр. Жеңіс, 55 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>ЭкоДом Павлодар, «Құрт тұзды» (100 г)</strong>. Картонная коробочка из крафт-картона с фигурными боковыми окнами и бумажной обечайкой с орнаментом. Холодильная витрина, 3-й ярус (фокусная полка).
          </div>
        </div>
      </div>
      <div class="note">
        * Съёмка проведена с разрешения администрации торговых точек. Лица покупателей и сотрудников в кадр не попали.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 1. Отчёт о полевом исследовании — Страница 2 из 5</span>
    </div>
  </div>

  <!-- СТРАНИЦА 3: ФОТОГРАФИИ ПОЛОК 2/2 -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 1.2. Фотографии полок (2/2)</h1>
          <span class="badge">Полевая фотофиксация</span>
        </div>
        <div class="subtitle">Фотографии полок с куртом и смежными снеками в торговых точках г. Астаны (продолжение)</div>
      </div>

      <div class="photos-grid">
        <!-- ФОТО 4 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo4}" alt="Фото 4">
          </div>
          <div class="photo-title">Фото 4 · Магазин «Magnum Daily»</div>
          <div class="photo-meta">Адрес: г. Астана, пр. Жеңіс, 55 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>ЭкоДом-Павлодар, «Курт соленый козий» (50 г)</strong>. Прозрачный вакуумный пакет. Наименование и состав напечатаны мелким шрифтом на белой наклейке. Молочная витрина, 4-й верхний ярус.
          </div>
        </div>

        <!-- ФОТО 5 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo5}" alt="Фото 5">
          </div>
          <div class="photo-title">Фото 5 · Магазин «Fermag»</div>
          <div class="photo-meta">Адрес: г. Астана, ул. Бейбітшілік, 25 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>«Айс», «Құрт · Курт Нағыз» (70 г)</strong>. Золотистый флоу-пак пакет с вырубным отверстием (европодвес), стилизованная иллюстрация девушки, знак Halal. Снековая зона на крючках, 1-й верхний ярус.
          </div>
        </div>

        <!-- ФОТО 6 -->
        <div class="photo-card">
          <div class="photo-wrapper">
            <img src="${photo6}" alt="Фото 6">
          </div>
          <div class="photo-title">Фото 6 · Магазин «Fermag»</div>
          <div class="photo-meta">Адрес: г. Астана, ул. Бейбітшілік, 25 · Дата: 16.10.2026</div>
          <div class="photo-desc">
            <strong>ЭкоДом-Павлодар, «Курт соленый с базиликом» (50 г)</strong>. Прозрачный вакуумный пакет, наименование на мелкой этикетке, видны кусочки сушёного базилика. Холодильная витрина, 2-й ярус.
          </div>
        </div>
      </div>
      <div class="note">
        * Съёмка проведена с разрешения администрации торговых точек. Лица покупателей и сотрудников в кадр не попали.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 1. Отчёт о полевом исследовании — Страница 3 из 5</span>
    </div>
  </div>

  <!-- СТРАНИЦА 4: ТАБЛИЦА 1.3 КОНКУРЕНТЫ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 1.3. Конкуренты (6 позиций курта)</h1>
          <span class="badge">Анализ цен и характеристик</span>
        </div>
        <div class="subtitle">Сравнительный анализ представленных на полках позиций по фактическим чекам, ценникам и маркировке</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 3%;">№</th>
            <th style="width: 14%;">Бренд, наименование</th>
            <th style="width: 5%;">Масса, г</th>
            <th style="width: 7%;">Цена, тг</th>
            <th style="width: 8%;">Цена за 100 г, тг</th>
            <th style="width: 14%;">Тип тары</th>
            <th style="width: 22%;">Цвет и дизайн</th>
            <th style="width: 7%;">Продукт виден</th>
            <th style="width: 7%;">Акция / QR</th>
            <th style="width: 13%;">Место на полке</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td><strong>Село Лесное</strong>, «Құрт классический»</td>
            <td style="text-align: center;">80</td>
            <td style="text-align: right; font-weight: bold;">420</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">525</td>
            <td>Вакуумный пакет с окном</td>
            <td>Небесно-голубой и зелёный фон, ярко-красное «ҚҰРТ», фоновый пейзаж, фигура спортсмена</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да (окно)</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Молочная витрина; 3-й ярус (уровень глаз)</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td><strong>ЭкоДом-Павлодар</strong>, «Курт соленый с перцем»</td>
            <td style="text-align: center;">50</td>
            <td style="text-align: right; font-weight: bold;">380</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">760</td>
            <td>Прозрачный вакуумный пакет</td>
            <td>Прозрачный пакет, стандартная белая наклейка с мелким чёрным текстом, хлопья паприки</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Молочная витрина; 2-й ярус</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td><strong>ЭкоДом Павлодар</strong>, «Құрт тұзды премиум»</td>
            <td style="text-align: center;">100</td>
            <td style="text-align: right; font-weight: bold;">690</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">690</td>
            <td>Коробка из крафт-картона с окнами</td>
            <td>Крафт-бежевый фон, оранжево-золотой пояс с традиционным орнаментом и иллюстрацией</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да (боковые окна)</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Молочная витрина; 3-й ярус (фокусная полка)</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">4</td>
            <td><strong>ЭкоДом-Павлодар</strong>, «Курт соленый козий»</td>
            <td style="text-align: center;">50</td>
            <td style="text-align: right; font-weight: bold;">450</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">900</td>
            <td>Прозрачный вакуумный пакет</td>
            <td>Прозрачный пакет, белая наклейка с плотным техническим шрифтом, белые цилиндры курта</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Молочная витрина; 4-й верхний ярус</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">5</td>
            <td><strong>«Айс»</strong>, «Құрт · Курт Нағыз»</td>
            <td style="text-align: center;">70</td>
            <td style="text-align: right; font-weight: bold;">395</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">564</td>
            <td>Флоу-пак пакет с европодвесом</td>
            <td>Золотисто-бежевый металлик, красные и синие плашки, иллюстрация девушки, знак Halal</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да (окно)</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Снековый стенд / крючки; 1-й верхний подвес</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">6</td>
            <td><strong>ЭкоДом-Павлодар</strong>, «Курт соленый с базиликом»</td>
            <td style="text-align: center;">50</td>
            <td style="text-align: right; font-weight: bold;">410</td>
            <td style="text-align: right; color: #0861C6; font-weight: bold;">820</td>
            <td>Прозрачный вакуумный пакет</td>
            <td>Прозрачный пакет без фирменного стиля, белая наклейка, видны шарики с сушёным базиликом</td>
            <td style="text-align: center; color: #16a34a; font-weight: bold;">Да</td>
            <td style="text-align: center; color: #dc2626;">Нет</td>
            <td>Молочная витрина; 2-й ярус</td>
          </tr>
        </tbody>
      </table>
      <div class="note">
        * Формула расчёта: Цена за 100 г = Цена ÷ Масса нетто × 100. Средняя стоимость курта в рознице варьируется от 525 до 900 тг за 100 г. Наибольшая наценка наблюдается у мелкофасованного курта (50 г). Все цены и граммовки зафиксированы в магазинах г. Астаны в октябре 2026 г.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 1. Отчёт о полевом исследовании — Страница 4 из 5</span>
    </div>
  </div>

  <!-- СТРАНИЦА 5: ТАБЛИЦА 1.4 ВЫВОДЫ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 1.4. Выводы полевого исследования</h1>
          <span class="badge">Стратегия и внедрение</span>
        </div>
        <div class="subtitle">Ключевые инсайты рынка и их прямое отражение в дизайне упаковки и промо-платформе TAMYR POP</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 4%;">№</th>
            <th style="width: 46%;">Вывод по результатам исследования полок</th>
            <th style="width: 50%;">Что и как мы учли в своём дизайне и промо-механике</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td>
              <div class="concl-badge">Ниша и УТП продукта</div>
              <div style="font-weight: 700; color: #0f172a; margin: 2px 0;">Абсолютное отсутствие копчёного курта на полках:</div>
              Среди всех 6 исследованных SKU ни один конкурент не предлагает копчёный курт. Представлены только солёный классический, с перцем и с базиликом. Ниша <strong>«ысталған / копчёный»</strong> свободна, что создаёт мощный потенциал лидерства в высокомаржинальном сегменте снеков.
            </td>
            <td>
              Слово <strong>«Құрт ысталған / Курт копчёный»</strong> вынесено крупной контрастной лентой прямо под логотипом «Гормолзавод» и доминирующим заголовком «QURT». Аппетитный золотисто-янтарный цвет продукта виден через круглое прозрачное окно и подчёркнут графикой дыма (не более 10% площади). Сохранена честность состава (нежирный творог, соль, копчение).
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td>
              <div class="concl-badge">Точка контакта и CRM</div>
              <div style="font-weight: 700; color: #0f172a; margin: 2px 0;">Полное отсутствие интерактива и QR-кодов:</div>
              Ни на одной упаковке конкурентов нет QR-кода, акции или программы лояльности. Покупка остаётся «слепой» и разовой: производители не знают своего потребителя, не собирают базу контактов и не стимулируют повторные покупки.
            </td>
            <td>
              Прямо в дизайн упаковки интегрирована промо-зона: <strong>QR-код размером 22×22 мм</strong> с призывом на двух языках переводит в цифровой сервис <strong>TAMYR POP</strong>. Уникальный код спрятан внутри упаковки (доступен только после покупки). Сервис регистрирует участника в базе ТОО «Гормолзавод» менее чем за 1 минуту и вовлекает в систему уровней и наград.
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td>
              <div class="concl-badge">Читаемость и бренд</div>
              <div style="font-weight: 700; color: #0f172a; margin: 2px 0;">Слабая различимость и перегруз чужих упаковок:</div>
              У «ЭкоДом-Павлодар» этикетка мелкая и нечитаемая с расстояния более 0.5 м. У «Село Лесное» и «Айс» дизайн перегружен сложными фоновыми иллюстрациями, пейзажами и орнаментами, из-за чего бренд и категория товара теряются на полке.
            </td>
            <td>
              Использована ясная европейская типографика по брендбуку: лаконичный бренд <strong>«Гормолзавод Көкшетау 1965»</strong> и монументальное <strong>«QURT»</strong> считываются с дистанции 1.5–2 метров. Тексты строго двуязычные, казахский язык — первым. Заводская чистота линий формирует доверие к качеству и ГОСТу.
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">4</td>
            <td>
              <div class="concl-badge">Цветовая дифференциация</div>
              <div style="font-weight: 700; color: #0f172a; margin: 2px 0;">Шаблонные палитры полочного пространства:</div>
              Полка заполнена либо невзрачными прозрачными пакетами («кустарный вид»), либо пёстрыми цветами (зелёный с голубым, золотистый металлик). Продукты сливаются в визуальный шум, не отражая премиальности и натуральности.
            </td>
            <td>
              Применена статусная фирменная палитра завода: глубокий кобальтовый синий (<strong>#0861C6</strong>), тёплый айвори (<strong>#FCF8F3</strong>) и небесно-голубой (<strong>#A4CFFF</strong>) с матовым soft-touch эффектом. Дизайн мгновенно выделяется на витрине монолитным премиальным цветовым пятном, сразу сообщая о высоком качестве молочного завода.
            </td>
          </tr>
        </tbody>
      </table>
      <div class="note">
        * Выводы подтверждают коммерческую и коммуникационную состоятельность разработанного решения. Упаковка и промо-механика ТОО «Гормолзавод» работают как единая экосистема привлечения и долгосрочного удержания покупателей.
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 1. Отчёт о полевом исследовании — Страница 5 из 5</span>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log("Launching browser via Playwright...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: "networkidle" });
  
  const targetPdf1 = path.resolve("01_Исследование_QURT_Гормолзавод.pdf");
  const targetPdf2 = path.resolve("тоерия/01_Исследование_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "01_Исследование_QURT_Гормолзавод.pdf");

  console.log("Rendering PDF landscape A4...");
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

  fs.writeFileSync(targetPdf1, pdfBuffer);
  console.log("Saved to:", targetPdf1);

  fs.writeFileSync(targetPdf2, pdfBuffer);
  console.log("Updated тоерия copy:", targetPdf2);

  try {
    fs.writeFileSync(targetPdfDesktop, pdfBuffer);
    console.log("Saved to Desktop directly:", targetPdfDesktop);
  } catch (e) {
    console.warn("Desktop copy failed:", e);
  }

  await browser.close();
  console.log("Done! PDF successfully created.");
}

generatePdf().catch(err => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
