module.exports = async function login(page) {

    await page.goto(process.env.LOGIN_URL);
    // Completa los campos de usuario y contrase�a
    await page.type('input[name="rut"]', process.env.RUT); // Cambia el selector seg�n tu DOM
    await page.type('input[name="dvrut"]', process.env.DVRUT);
    await page.type('input[name="password"]', process.env.PASSWORD);

    // Haz clic en el bot�n de inicio de sesi�n
    await page.click('button[type="submit"]');

    // Espera a que la p�gina de inicio se cargue
    await page.waitForNavigation();
    console.log('\033[32;5m-LOGIN-\033[32m');

}

