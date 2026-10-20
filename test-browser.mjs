import { chromium } from 'playwright';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  console.log("Navigating to localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'load' });
  
  console.log("Waiting and clicking Sejarah DPW...");
  await page.waitForTimeout(1000);
  
  // Try to click "Profil" -> "Sejarah DPW"
  try {
     await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('a'));
        const sejarahLink = els.find(e => e.textContent.includes('Sejarah DPW'));
        if(sejarahLink) sejarahLink.click();
     });
     console.log("Clicked Sejarah DPW link!");
  } catch (e) {
     console.log("Could not click:", e.message);
  }

  await page.waitForTimeout(2000);
  await browser.close();
  console.log("Closed.");
})();
