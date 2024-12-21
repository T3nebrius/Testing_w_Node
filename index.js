const puppeteer = require('puppeteer');
require('dotenv').config();

const initializeBrowser = require('./browser');
const login = require('./scripts/login');
const testFormSubmission = require('./scripts/testForm');

(async () => {
    const { browser, page } = await initializeBrowser(false); // Cambia a true para headless
    try {
        await login(page);
        await testFormSubmission(page);
    } catch (error) {
        console.error('Error durante el testing:', error);
    } finally {
        await browser.close();
    }
})();
