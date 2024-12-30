const puppeteer = require('puppeteer');

async function initializeBrowser(headless = false) {
    const browser = await puppeteer.launch({ headless });
    const page = await browser.newPage();
    const resolution = { width: 1920, height: 1080 }; // Cambia estos valores según lo necesites
    await page.setViewport(resolution);
    return { browser, page };
}

module.exports = initializeBrowser;
