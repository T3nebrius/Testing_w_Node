
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.click('#identifierId');
    await page.type('#identifierId', 'f');
    await page.type('#identifierId', 'fj');
    await page.type('#identifierId', 'fjh');
    await page.type('#identifierId', 'fjhj');
    await page.type('#identifierId', 'fjhjf');
    await page.type('#identifierId', 'fjhjfh');
    await page.type('#identifierId', 'fjhjfhj');
    await page.type('#identifierId', 'fjhjfhjk');
    await page.type('#identifierId', 'fjhjfhj');
    await page.type('#identifierId', 'fjhjfh');
    await page.type('#identifierId', 'fjhjf');
    await page.type('#identifierId', 'fjhj');
    await page.type('#identifierId', 'fjh');
    await page.type('#identifierId', 'fj');
    await page.type('#identifierId', 'f');
    await browser.close();
})();
        