module.exports = async function login(page) {

    await page.goto(process.env.LOGIN_URL);
    // Completa los campos de usuario y contraseña
    await page.type('input[name="rut"]', process.env.RUT, { delay: 50 }); 
    await page.type('input[name="dvrut"]', process.env.DVRUT), { delay: 50 };
    await page.type('input[name="password"]', process.env.PASSWORD, { delay: 50 });

    // Haz clic en el botón de inicio de sesión
    await page.click('button[type="submit"]');

    // Espera a que la página de inicio se cargue
    await page.waitForNavigation();
    console.log('\033[32;5m- LOGIN -\033[32m');

}

