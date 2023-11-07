const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const pageTitle = await page.title();
  console.log("Page title:", pageTitle);

  await browser.close();
})();
