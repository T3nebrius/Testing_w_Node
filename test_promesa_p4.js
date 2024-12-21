const login = require('./scripts/login.js');

async function testPromesaP4(page){
    await page.goto('http://localhost:8082/gci/gi/promesas/crear_paso_4.php?id_promesa=3543&id_temp#table_reserva');

    page.on('dialog', async (dialog) => {
        //console.log(`Mensaje de alerta capturado: ${dialog.message()}`); // Captura el mensaje
        const mensaje = `${dialog.message()}`;
        if (mensaje.includes('El monto asignado en las cuotas es mayor al valor de Pie pago contado')){
            console.log('\033[31;5m-MONTO NEGATIVO-\033[0m');
        }
        await dialog.dismiss(); // Cierra el alert
    });
    
    
    // Espera a que el botón esté visible y disponible
    await page.waitForSelector('button.btn.btn-blue.btn-sm');



    const button = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('button.btn.btn-blue.btn-sm'))
            .find(button => button.textContent.includes('Guardar y Seguir'));
    });

    if (button) {
        await button.click();
        console.log('\033[32m-Click en boton "Guardar y Seguir"-\033[0m');
    } else {
        console.log('\033[32m-Botón "Guardar y Seguir" no encontrado.-\033[0m');
    }
        

    //await browser.close(); // Cierra el navegador
};

(async () => {
    const { browser, page } = await login(); // Llama a la función de login
    await testPromesaP4(page); // Llama a la función de prueba
    await browser.close(); // Cierra el navegador al final
})();
