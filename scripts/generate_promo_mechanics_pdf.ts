import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

function getBase64Image(filePath: string): string {
  const fileData = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileData.toString("base64")}`;
}

const screen1 = getBase64Image("public/screens/screen_1_home.png");
const screen2 = getBase64Image("public/screens/screen_2_register.png");
const screen3 = getBase64Image("public/screens/screen_3_code.png");
const screen4 = getBase64Image("public/screens/screen_4_rewards.png");
const screen5 = getBase64Image("public/screens/screen_5_rules.png");

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Материал 5. Промо-механика — проект QURT</title>
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
      font-size: 9.5pt;
      line-height: 1.38;
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
    .section-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 10px 0 5px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 13px;
      background: #0861C6;
      border-radius: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
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
    .cjm-flow {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      margin: 8px 0;
    }
    .cjm-step {
      flex: 1;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      padding: 6px 8px;
      text-align: center;
      font-size: 8pt;
      position: relative;
    }
    .cjm-step strong {
      display: block;
      color: #0861C6;
      font-size: 8.5pt;
      margin-bottom: 2px;
    }
    .screens-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 8px;
    }
    .screen-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .screen-img-box {
      width: 100%;
      height: 280px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      display: flex;
      justify-content: center;
    }
    .screen-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
    .screen-title {
      font-weight: 700;
      font-size: 8.5pt;
      color: #0861C6;
      margin-top: 6px;
      text-align: center;
    }
    .screen-ai {
      font-size: 7pt;
      color: #64748b;
      margin-top: 2px;
      text-align: center;
    }
    .highlight-card {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      border-radius: 4px;
      padding: 8px 12px;
      margin: 8px 0;
      font-size: 8.5pt;
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

  <!-- СТРАНИЦА 1: ПУТЬ ПОКУПАТЕЛЯ И СБОР ДАННЫХ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Материал 5. Промо-механика — проект QURT</h1>
          <span class="badge">Раздел 6 ТЗ Партнёра</span>
        </div>
        <div class="subtitle">ТОО «Гормолзавод» (г. Кокшетау) · Цифровая промо-платформа TAMYR POP · Архитектура удержания покупателей</div>
      </div>

      <div class="section-title">6.1. Путь покупателя (CJM — Customer Journey Map)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 6%; text-align: center;">Шаг</th>
            <th style="width: 32%;">Что делает покупатель</th>
            <th style="width: 38%;">Что он видит или получает</th>
            <th style="width: 24%;">Точка контакта</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td>Покупает пачку копчёного курта QURT в супермаркете</td>
            <td>Заметная промо-зона на лицевой стороне с призывом «Сыйлық ұтып ал! / Выигрывай подарки!» и QR-кодом</td>
            <td>Полка магазина / упаковка</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td>Наводит камеру смартфона и сканирует QR-код</td>
            <td>Мгновенный переход без установки приложений на мобильный веб-сервис <strong>TAMYR POP</strong></td>
            <td>QR-код лицевой стороны (22×22 мм)</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td>Проходит быструю регистрацию (менее 1 минуты)</td>
            <td>Короткая форма из 5 полей, подтверждение согласия на сбор ПД по Закону РК, SMS OTP-авторизация</td>
            <td>Веб-страница /register</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">4</td>
            <td>Вскрывает пачку и вводит секретный 8-значный код</td>
            <td>Мгновенное начисление баллов, анимация прогресса, статус приближения к гарантированному подарку</td>
            <td>Веб-страница /code (ввод кода)</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">5</td>
            <td>Получает гарантированный подарок / участвует в розыгрыше</td>
            <td>Фирменный подарок завода, SMS-уведомление, мотивация к повторной покупке курта для следующего уровня</td>
            <td>Личный кабинет /dashboard</td>
          </tr>
        </tbody>
      </table>

      <div class="cjm-flow">
        <div class="cjm-step">
          <strong>1. Покупка</strong>
          Упаковка с QR на полке
        </div>
        <div style="display:flex;align-items:center;color:#0861C6;font-weight:bold;">→</div>
        <div class="cjm-step">
          <strong>2. QR-скан</strong>
          Переход на TAMYR POP
        </div>
        <div style="display:flex;align-items:center;color:#0861C6;font-weight:bold;">→</div>
        <div class="cjm-step">
          <strong>3. Регистрация</strong>
          5 полей + согласие ПД
        </div>
        <div style="display:flex;align-items:center;color:#0861C6;font-weight:bold;">→</div>
        <div class="cjm-step">
          <strong>4. Ввод кода</strong>
          Код из пачки → Баллы
        </div>
        <div style="display:flex;align-items:center;color:#0861C6;font-weight:bold;">→</div>
        <div class="cjm-step">
          <strong>5. Удержание</strong>
          Подарки + Повторные покупки
        </div>
      </div>

      <div class="section-title">6.2. Единая точка сбора данных (Веб-платформа TAMYR POP)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Пункт по ТЗ</th>
            <th style="width: 70%;">Решение команды</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Цифровой сервис и обоснование</strong></td>
            <td>
              <strong>Мобильное веб-приложение (Next.js 15 PWA)</strong>, а не Telegram-бот.<br>
              <em>Обоснование</em>: Сканирование стандартной камерой любого смартфона (iOS / Android) сразу открывает страницу без необходимости иметь аккаунт в мессенджере. Работает в браузере за 0.8 сек, не требует загрузок из App Store / Google Play, обладает брендированным интерфейсом в брендбуке завода.
            </td>
          </tr>
          <tr>
            <td><strong>Обязательные поля регистрации (не более 6)</strong></td>
            <td>
              Ровно <strong>5 полей</strong> (заполнение за 45 секунд):<br>
              1. Имя участника; 2. Номер телефона (РК, +7 7xx...); 3. Город проживания; 4. Возрастная группа (18–24, 25–34, 35–44, 45+); 5. Уникальный код из пачки (опционально при первой регистрации).
            </td>
          </tr>
          <tr>
            <td><strong>Согласие на сбор и обработку ПД</strong></td>
            <td>
              Отдельный неотмеченный чекбокс с прямой ссылкой на политику конфиденциальности по Закону РК № 94-V «О персональных данных и их защите». Время, IP и версия согласия фиксируются в базе данных PostgreSQL (модель <code>ConsentRecord</code>).
            </td>
          </tr>
          <tr>
            <td><strong>Размещение уникального кода на упаковке</strong></td>
            <td>
              Секретный код размещается <strong>на внутренней стороне упаковки под герметичным швом</strong> (термотрансферная печать при фасовке). Код недоступен до момента покупки и вскрытия пачки.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 5. Промо-механика · Страница 1 из 3</span>
    </div>
  </div>

  <!-- СТРАНИЦА 2: НАГРАДЫ, УДЕРЖАНИЕ И KPI -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Таблица 5.3. Механика вознаграждения и удержания</h1>
          <span class="badge">Награды и лояльность</span>
        </div>
        <div class="subtitle">Связь призов с продукцией ТОО «Гормолзавод», многоуровневое накопление и триггерные сценарии</div>
      </div>

      <div class="section-title">6.4. Награды и призовой фонд</div>
      <table>
        <thead>
          <tr>
            <th style="width: 14%; text-align: center;">Количество кодов</th>
            <th style="width: 40%;">Наименование награды</th>
            <th style="width: 26%;">Вид приза</th>
            <th style="width: 20%; text-align: right;">Ориентировочная стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold; color: #0861C6; font-size: 11pt;">3 кода</td>
            <td><strong>Фирменный эко-шоппер «Гормолзавод 1965»</strong> + персональный сертификат со скидкой 20% на продукцию завода в фирменных торговых точках</td>
            <td>Гарантированный приз каждому</td>
            <td style="text-align: right; font-weight: bold;">2 500 тг</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold; color: #0861C6; font-size: 11pt;">5 кодов</td>
            <td><strong>Премиальный крафтовый бокс молочной продукции «Гормолзавод»</strong> (набор выдержанных сыров, копчёный курт QURT, масло сладкосливочное)</td>
            <td>Гарантированный приз каждому</td>
            <td style="text-align: right; font-weight: bold;">6 000 тг</td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold; color: #0861C6; font-size: 11pt;">10 кодов</td>
            <td><strong>Участие в ежемесячном розыгрыше суперпризов</strong>:<br>1. Семейный эко-тур на выходные в курортную зону Бурабай (отель + трансфер).<br>2. 5 подарочных сертификатов в супермаркеты Magnum / Small на 50 000 тг.</td>
            <td>Суперприз / Розыгрыш среди участников</td>
            <td style="text-align: right; font-weight: bold;">500 000 тг<br><span style="font-size:7.5pt;color:#64748b;">(главный тур)</span></td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold;">
            <td colspan="2"><strong>Срок действия акции:</strong> 1 ноября 2026 г. – 31 января 2027 г. (3 месяца)</td>
            <td colspan="2" style="text-align: right; color: #0861C6; font-size: 10pt;">Общий призовой фонд: <strong>650 000 тг</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">6.5. Сценарии удержания покупателей (Trigger CRM)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 5%; text-align: center;">№</th>
            <th style="width: 25%;">Когда отправляется</th>
            <th style="width: 15%;">Канал</th>
            <th style="width: 55%;">Текст сообщения (KZ / RU в тоне бренда)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center; font-weight: bold;">1</td>
            <td>Сразу после успешной активации промокода</td>
            <td>SMS / Notification outbox</td>
            <td>
              <strong>KZ:</strong> «Кодыңыз қабылданды! Сізде [X] ұпай бар. Сыйлыққа дейін [Y] код қалды: tamyr.kz»<br>
              <strong>RU:</strong> «Код успешно принят! У вас [X] баллов. До подарка осталось [Y] кода: tamyr.kz»
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">2</td>
            <td>Если нет повторной покупки в течение 7–10 дней</td>
            <td>SMS (только при согласии на рассылку)</td>
            <td>
              <strong>KZ:</strong> «Көкшетаулық құрт дәмі сағындырды ма? Жаңа код тіркеп, сыйлыққа жақындаңыз: tamyr.kz»<br>
              <strong>RU:</strong> «Соскучились по вкусу копчёного курта? Введите новый код и заберите подарок: tamyr.kz»
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-weight: bold;">3</td>
            <td>При достижении порогового уровня (3, 5 или 10 кодов)</td>
            <td>SMS / Личный кабинет</td>
            <td>
              <strong>KZ:</strong> «Құттықтаймыз! Жаңа деңгейге жеттіңіз. Сыйлығыңызды кабинеттен таңдаңыз: tamyr.kz»<br>
              <strong>RU:</strong> «Поздравляем! Вы достигли нового уровня. Заберите свой подарок в кабинете: tamyr.kz»
            </td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">6.6. Показатели эффективности (Целевые KPI кампании)</div>
      <table>
        <thead>
          <tr>
            <th style="width: 50%;">Показатель эффективности по ТЗ</th>
            <th style="width: 25%; text-align: center;">Цель на период акции</th>
            <th style="width: 25%;">Способ измерения в БД</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Количество зарегистрированных участников</strong></td>
            <td style="text-align: center; font-weight: bold; color: #0861C6;">1 200 пользователей</td>
            <td>Записи в таблице <code>User</code> со статусом PARTICIPANT</td>
          </tr>
          <tr>
            <td><strong>Доля повторных покупок (2 и более кода от одного покупателя)</strong></td>
            <td style="text-align: center; font-weight: bold; color: #16a34a;">не менее 45 %</td>
            <td>Участники с ≥2 транзакциями <code>CodeRedemption</code> / все участники</td>
          </tr>
          <tr>
            <td><strong>Количество активных участников по итогам акции</strong></td>
            <td style="text-align: center; font-weight: bold; color: #0861C6;">850 человек</td>
            <td>Участники с кодами за последние 30 дней</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 5. Промо-механика · Страница 2 из 3</span>
    </div>
  </div>

  <!-- СТРАНИЦА 3: РЕАЛЬНЫЕ ЭКРАНЫ ЦИФРОВОГО СЕРВИСА -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-top">
          <h1 class="title">Макеты экранов цифрового сервиса TAMYR POP</h1>
          <span class="badge">Экраны сервиса по п. 6.7 ТЗ</span>
        </div>
        <div class="subtitle">Интерфейс мобильного сервиса TAMYR POP (Next.js 15 App Router, TypeScript, Tailwind CSS, PostgreSQL)</div>
      </div>

      <div class="screens-grid">
        <div class="screen-card">
          <div class="screen-img-box">
            <img src="${screen1}" alt="Экран 1: Главная">
          </div>
          <div class="screen-title">1. Главная страница (Hero)</div>
          <div class="screen-ai">AI-инструмент: Claude 3.7 / Next.js</div>
        </div>

        <div class="screen-card">
          <div class="screen-img-box">
            <img src="${screen2}" alt="Экран 2: Регистрация">
          </div>
          <div class="screen-title">2. Регистрация участника</div>
          <div class="screen-ai">AI-инструмент: Claude 3.7 / Next.js</div>
        </div>

        <div class="screen-card">
          <div class="screen-img-box">
            <img src="${screen3}" alt="Экран 3: Активация кода">
          </div>
          <div class="screen-title">3. Активация промокода</div>
          <div class="screen-ai">AI-инструмент: Claude 3.7 / Next.js</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 10px;">
        <div class="screen-card" style="flex-direction: row; gap: 10px; align-items: center; padding: 6px 12px;">
          <div class="screen-img-box" style="width: 75px; height: 110px;">
            <img src="${screen4}" alt="Экран 4: Награды">
          </div>
          <div>
            <div class="screen-title" style="text-align: left; margin: 0;">4. Витрина наград и баллы</div>
            <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Личный кабинет участника, индикатор уровней (3, 5, 10 кодов) и история транзакций в PostgreSQL.</div>
            <div class="screen-ai" style="text-align: left; margin-top: 2px;">AI-инструмент: Claude 3.7 / Next.js</div>
          </div>
        </div>

        <div class="screen-card" style="flex-direction: row; gap: 10px; align-items: center; padding: 6px 12px;">
          <div class="screen-img-box" style="width: 75px; height: 110px;">
            <img src="${screen5}" alt="Экран 5: Правила">
          </div>
          <div>
            <div class="screen-title" style="text-align: left; margin: 0;">5. Официальные правила акции</div>
            <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Двуязычный текст условий, сроки проведения, юридические контакты завода и FAQ.</div>
            <div class="screen-ai" style="text-align: left; margin-top: 2px;">AI-инструмент: Claude 3.7 / Next.js</div>
          </div>
        </div>
      </div>

      <div class="highlight-card" style="margin-top: 8px;">
        <div style="font-weight: 700; color: #166534; font-size: 8.5pt;">Техническая надёжность цифровой платформы:</div>
        <div style="font-size: 7.5pt; color: #1e293b; line-height: 1.35;">
          • <strong>Защита от подбора</strong>: Коды валидируются по алгоритму HMAC-SHA-256 с rate-limiting в базе данных PostgreSQL.<br>
          • <strong>Предотвращение повторов</strong>: Обработка кода в <code>serializable</code> транзакции гарантирует строго однократное начисление баллов.<br>
          • <strong>Mobile-first & PWA</strong>: Полная адаптивность от 360 px, время загрузки первого экрана менее 1 сек, поддержка установки на домашний экран смартфона.
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>AI Design Hackathon 2.0 · ТОО «Гормолзавод» Кокшетау</span>
      <span>Материал 5. Промо-механика · Страница 3 из 3</span>
    </div>
  </div>

</body>
</html>
`;

async function run() {
  console.log("Launching Chromium for Material 5 Promo Mechanics...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  const targetPdf = path.resolve("05_Промо-механика_QURT_Гормолзавод.pdf");
  const targetPdfTheory = path.resolve("тоерия/05_Промо-механика_QURT.pdf");
  const targetPdfDesktop = path.resolve("..", "05_Промо-механика_QURT_Гормолзавод.pdf");

  console.log("Rendering A4 Portrait PDF for Promo Mechanics...");
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
  console.log("Done! Material 5 Promo Mechanics PDF successfully created.");
}

run().catch(err => {
  console.error("Error generating promo PDF:", err);
  process.exit(1);
});
