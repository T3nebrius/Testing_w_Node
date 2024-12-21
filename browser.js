const puppeteer = require('puppeteer');

async function initializeBrowser(headless = false) {
    const browser = await puppeteer.launch({ headless });
    const page = await browser.newPage();
    return { browser, page };
}

module.exports = initializeBrowser;
