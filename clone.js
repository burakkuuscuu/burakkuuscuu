const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'https://sub9.direct-offer.bet/?tgWebAppStartParam=DarknessCatAi-2500-125-1742721028';
  
  const browser = await puppeteer.launch({
    headless: false, // Tarayıcı görünsün (kontrol amaçlı)
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Telegram'dan gelmiş gibi davran
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Telegram');

  await page.setExtraHTTPHeaders({
    'Referer': 'https://t.me/',
    'Origin': 'https://t.me'
  });

  // Sayfayı aç
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Sayfanın içeriğini al ve kaydet
  const html = await page.content();
  fs.writeFileSync('index.html', html);

  console.log("✅ Sayfa başarıyla kaydedildi!");

  await browser.close();
})();