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
        console.error('\033[32m-Error durante el testing:-\033[0m', error);
    } finally {
        await browser.close();
    }
})();
