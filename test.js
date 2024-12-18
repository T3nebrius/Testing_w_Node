const login = require('./scripts/login.js');

async function testFormSubmission(page) {
    // Accede a la p�gina que quieres probar
    await page.goto('http://localhost:8082/gci/gi/clientes/vendedor.php');

    // Simula la entrada en el formulario
    await page.type('input[name="rut_nat"]', '13981995');
    await page.type('input[name="dvrut_nat"]', '0');
    await page.type('input[name="nombre_nat"]', 'Ruben');
    await page.type('input[name="apellido1_nat"]', '');
    await page.type('input[name="apellido2_nat"]', '');
    await page.type('input[name="email"]', '');
    await page.type('input[name="celular"]', '');
    await page.type('input[name="dni_nat"]', '');

    // Simula el env�o del formulario
    await page.waitForSelector('#btn_form_natural');
    await page.click('#btn_form_natural');
    console.log('Evento click ejecutado en el bot�n Buscar.');

    // Espera a que la p�gina se renderice
    await page.waitForSelector('#grillaCliente'); 
    console.log('Resultados cargados en la p�gina.');

    // Captura los titulos de la grilla
    const content = await page.$eval('#grillaCliente', el => el.innerText);
    console.log("Datos ENCONTRADOS en la grilla:\n", content);

    // Captura los td
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 6000)));
    const gridContent = await page.$$eval('#grillaCliente tbody tr', rows => 
        rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map(cell => cell.innerText.trim());
            }
        )
    );
    console.log("Contenido completo de la grilla despu�s de esperar:\n", gridContent);
}

(async () => {
    const { browser, page } = await login(); // Llama a la funci�n de login
    await testFormSubmission(page); // Llama a la funci�n de prueba
    //await browser.close(); // Cierra el navegador al final
})();
