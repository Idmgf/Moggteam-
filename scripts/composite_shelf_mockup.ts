import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const bgSrc = "C:/Users/saken/.gemini/antigravity/brain/cb302035-0650-4a4f-84c6-7f45d272aa8d/empty_shelf_bg_1792391207853.jpg";
const frontSrc = path.resolve("новый дизан  упоковки.png");
const backSrc  = path.resolve("задния  часть  упаковки.png");

const bgBase64    = `data:image/jpeg;base64,${fs.readFileSync(bgSrc).toString("base64")}`;
const frontBase64 = `data:image/png;base64,${fs.readFileSync(frontSrc).toString("base64")}`;
const backBase64  = `data:image/png;base64,${fs.readFileSync(backSrc).toString("base64")}`;

const html = `<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      position: relative;
      background: #000;
      font-family: "Helvetica Neue", Arial, sans-serif;
    }

    /* ── Фон ── */
    .bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* Лёгкое потемнение низа для контраста с ценником */
      filter: brightness(1.05) saturate(1.1);
    }

    /* Тёмный градиент снизу для красивого основания полки */
    .vignette {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to top,   rgba(10,12,20,0.72) 0%, transparent 38%),
        linear-gradient(to bottom, rgba(10,12,20,0.15) 0%, transparent 18%);
      z-index: 2;
    }

    /* ── Центральная сцена с пачками ── */
    .stage {
      position: absolute;
      bottom: 145px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 60px;
      z-index: 10;
    }

    /* Обёртка одной пачки */
    .pack-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Лицевая пачка — чуть крупнее */
    .pack-front img {
      height: 680px;
      width: auto;
      object-fit: contain;
      filter:
        drop-shadow(0 35px 50px rgba(0,0,0,0.70))
        drop-shadow(0  8px 18px rgba(0,0,0,0.45))
        drop-shadow(-6px 0 24px rgba(0,60,180,0.18));
      transform: perspective(1200px) rotateY(4deg);
    }

    /* Оборотная пачка — немного меньше и повёрнута в другую сторону */
    .pack-back img {
      height: 620px;
      width: auto;
      object-fit: contain;
      filter:
        drop-shadow(0 30px 45px rgba(0,0,0,0.65))
        drop-shadow(0  6px 14px rgba(0,0,0,0.40))
        drop-shadow( 6px 0 24px rgba(0,60,180,0.14));
      transform: perspective(1200px) rotateY(-5deg);
    }

    /* Контактная тень под пачкой */
    .ground-shadow {
      position: absolute;
      bottom: -14px;
      width: 300px;
      height: 28px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(5,10,30,0.82) 0%, rgba(5,10,30,0.30) 55%, transparent 75%);
      filter: blur(8px);
      z-index: -1;
    }

    /* ── Световой блик на полке под пачками ── */
    .shelf-glow {
      position: absolute;
      bottom: 135px;
      left: 50%;
      transform: translateX(-50%);
      width: 860px;
      height: 80px;
      background: radial-gradient(ellipse, rgba(100,130,220,0.22) 0%, transparent 70%);
      filter: blur(18px);
      z-index: 9;
      pointer-events: none;
    }

    /* ── Нижняя плашка-ценник ── */
    .price-strip {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 138px;
      background: linear-gradient(180deg, rgba(8,10,22,0.0) 0%, rgba(8,10,22,0.92) 28%, rgba(8,10,22,0.98) 100%);
      z-index: 20;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 22px;
      gap: 48px;
    }

    /* Карточка с ценой */
    .price-card {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.14);
      border-left: 4px solid #4B8EF5;
      border-radius: 10px;
      padding: 12px 28px 12px 22px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .price-card .brand-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .price-card .brand-name {
      font-size: 11px;
      font-weight: 700;
      color: #8ab4f8;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }
    .price-card .product-name {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
      letter-spacing: -0.2px;
    }
    .price-card .product-sub {
      font-size: 11px;
      color: rgba(255,255,255,0.50);
      font-weight: 400;
    }

    /* Разделитель */
    .divider {
      width: 1px;
      height: 50px;
      background: rgba(255,255,255,0.15);
    }

    /* Цена */
    .price-value {
      text-align: right;
      line-height: 1;
    }
    .price-main {
      font-size: 44px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -1px;
      line-height: 1;
    }
    .price-main sup {
      font-size: 22px;
      font-weight: 800;
      vertical-align: super;
      color: #8ab4f8;
      margin-left: 3px;
    }
    .price-per {
      font-size: 10px;
      color: rgba(255,255,255,0.45);
      margin-top: 3px;
      text-align: right;
    }

    /* Разделитель между карточками */
    .strip-sep {
      width: 1px;
      height: 70px;
      background: rgba(255,255,255,0.08);
      align-self: center;
    }

    /* Промо-карточка */
    .promo-card {
      display: flex;
      align-items: center;
      gap: 18px;
      background: rgba(22,163,74,0.12);
      border: 1px solid rgba(22,163,74,0.30);
      border-left: 4px solid #22c55e;
      border-radius: 10px;
      padding: 12px 28px 12px 22px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .promo-icon {
      font-size: 38px;
      line-height: 1;
    }
    .promo-text .promo-label {
      font-size: 10px;
      font-weight: 700;
      color: #4ade80;
      letter-spacing: 1.2px;
      text-transform: uppercase;
    }
    .promo-text .promo-title {
      font-size: 17px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
    }
    .promo-text .promo-sub {
      font-size: 11px;
      color: rgba(255,255,255,0.45);
    }

    /* ── Лейбл «Новинка» над лицевой пачкой ── */
    .badge-new {
      position: absolute;
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 5px 16px;
      border-radius: 20px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(239,68,68,0.45);
    }
  </style>
</head>
<body>

  <!-- Фон супермаркета -->
  <img class="bg" src="${bgBase64}" alt="bg">
  <!-- Тёмные виньетки -->
  <div class="vignette"></div>

  <!-- Световой блик на полке -->
  <div class="shelf-glow"></div>

  <!-- Сцена с пачками -->
  <div class="stage">

    <!-- ЛИЦЕВАЯ — главная, крупнее -->
    <div class="pack-wrap pack-front">
      <div class="badge-new">🆕 ЖАҢАЛЫҚ · НОВИНКА</div>
      <img src="${frontBase64}" alt="QURT лицевая">
      <div class="ground-shadow"></div>
    </div>

    <!-- ОБОРОТНАЯ -->
    <div class="pack-wrap pack-back">
      <img src="${backBase64}" alt="QURT оборотная">
      <div class="ground-shadow"></div>
    </div>

  </div>

  <!-- Нижний ценник / промо-полоса -->
  <div class="price-strip">

    <!-- Ценник -->
    <div class="price-card">
      <div class="brand-col">
        <span class="brand-name">ТОО «Гормолзавод» · Көкшетау</span>
        <span class="product-name">ҚҰРТ ЫСТАЛҒАН<br>КУРТ КОПЧЁНЫЙ</span>
        <span class="product-sub">Дой-пак · 100 г · Zip-замок</span>
      </div>
      <div class="divider"></div>
      <div class="price-value">
        <div class="price-main">650<sup>₸</sup></div>
        <div class="price-per">6 500 ₸ / кг</div>
      </div>
    </div>

    <div class="strip-sep"></div>

    <!-- Промо TAMYR POP -->
    <div class="promo-card">
      <div class="promo-icon">🎁</div>
      <div class="promo-text">
        <div class="promo-label">TAMYR POP · Цифровой промо-сервис</div>
        <div class="promo-title">СЫЙЛЫҚ ҰТЫП АЛ!<br>ВЫИГРЫВАЙ ПРИЗЫ!</div>
        <div class="promo-sub">Сканируй QR с пачки · Вводи промокод</div>
      </div>
    </div>

  </div>

</body>
</html>`;

async function run() {
  console.log("Rendering premium shelf mockup v3...");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  const outJpg       = path.resolve("public/04_Мокап_на_полке.jpg");
  const outTheory    = path.resolve("тоерия/04_Мокап_на_полке.jpg");
  const outDesktop   = path.resolve("../04_Мокап_на_полке.jpg");

  await page.screenshot({ path: outJpg, type: "jpeg", quality: 97 });
  console.log("✓ Saved:", outJpg);

  fs.copyFileSync(outJpg, outTheory);
  fs.copyFileSync(outJpg, outDesktop);
  console.log("✓ Copied to тоерия and Desktop");

  await browser.close();
  console.log("Done!");
}

run().catch(e => { console.error(e); process.exit(1); });
