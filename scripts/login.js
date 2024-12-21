const puppeteer = require('puppeteer');
require('dotenv').config();

async function login() {
    const browser = await puppeteer.launch({ headless: true }); // No headless para ver la ejecución
    const page = await browser.newPage();

    // Navega a la página de login
    await page.goto(process.env.LOGIN_URL);

    // Completa los campos de usuario y contraseña
    await page.type('input[name="rut"]', process.env.RUT); // Cambia el selector según tu DOM
    await page.type('input[name="dvrut"]', process.env.DVRUT);
    await page.type('input[name="password"]', process.env.PASSWORD);

    // Haz clic en el botón de inicio de sesión
    await page.click('button[type="submit"]');

    // Espera a que la página de inicio se cargue
    await page.waitForNavigation();
    console.log('\033[32;5m-LOGIN-\033[32m');

    // Retorna el navegador y la página para reutilizarlos en la prueba
    return { browser, page };
}

module.exports = login;
