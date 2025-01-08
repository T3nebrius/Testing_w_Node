const testAbrirFichaCliente = require('./testAbrirFichaCliente');

module.exports = async function testFormSubmission(page) {
    await page.goto('http://localhost:8082/gci/gi/clientes/vendedor.php');
    
    await page.type('input[name="rut_nat"]', '12342578');
    await page.type('input[name="dvrut_nat"]', '2');
    await page.type('input[name="nombre_nat"]', 'Ruben');
    await page.click('#btn_form_natural');
    
    await page.waitForSelector('#grillaCliente');
    console.log('- RESULTADOS CARGADOS -');

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 6000)));
    const gridContent = await page.$$eval('#grillaCliente tbody tr', rows => 
        rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map(cell => cell.innerText.trim());
            }
        )
    );

    /* CONTENIDO A VERIFICAR */
    const expectedResult = [
        [
            '830',
            '12342578-2',
            'RUBEN',
            'CARDENAS',
            'ALVAREZ',
            '98620274',
            'rcardenv@uc.cl',
            '',
            '27-10-2007',
            ''
        ]
    ];


    /* VALIDACION */
    const isMatch = JSON.stringify(gridContent) === JSON.stringify(expectedResult);
    if (isMatch) {
        console.log("- LOS DATOS CARGADOS COINCIDEN CON EL RESULTADO OBTENIDO POR GRILLA -");
    } else {
        console.error("- ERROR, DATOS NO COINCIDEN -");
        console.log("Diferencias encontradas:");
        console.log("Resultado esperado:", JSON.stringify(expectedResult, null, 2));
        console.log("Resultado obtenido:", JSON.stringify(gridContent, null, 2));
    }

    /* CLICK EN BOTON FICHA DE CLIENTE */
    console.log("- ABRIENDO FICHA CLIENTE...-");
    await page.waitForSelector('a.btn.btn-xs.btn-default[title="Ficha Cliente"]');
    await page.click('a.btn.btn-xs.btn-default[title="Ficha Cliente"]');
    console.log("- Clic en el enlace 'Ficha Cliente' realizado. -");

    /* CLICK EN EL BOTON COTIZAR EN SALA */
    console.log("- Simulando clic en el elemento 'Cotización en Sala'... -");
    await page.waitForSelector('#coti_sala');
    await page.click('#coti_sala');
    console.log("- Clic en el elemento 'Cotización en Sala' realizado. -");

    /* CLICK EN EL PRIMER PRODUCTO PRINCIPAL */
    /* SELECCIONAR EL PRIMER ELEMENTO DEL SELECTOR SIN CONOCER SU VALOR */
    /* SIMULAR CLIC EN EL PRIMER ELEMENTO DEL SELECTOR */
    console.log("- Simulando clic en el primer elemento del selector... -");
    await page.waitForSelector('#sel_prod');
    
    // Seleccionar el primer `<option>` sin importar su contenedor
    const firstOption = await page.$('#sel_prod option');
    
    // Asegurarse de que el primer `<option>` exista antes de intentar interactuar
    if (firstOption) {
        await firstOption.click(); 
        console.log("- Click realizado exitosamente en el primer elemento del selector. -");
    } else {
        console.error("- ERROR: El primer elemento del selector no fue encontrado. -");
    }

    /* SIMULAR CLICK EN EL BOTÓN */
    console.log("- Simulando el clic en el botón 'Agregar Producto'... -");
    await page.waitForSelector('#sel_boton_agregar');
    await page.click('#sel_boton_agregar');
    console.log("- Clic en el botón realizado exitosamente. -");
    

    /* SIMULAR CLICK EN EL BOTÓN 'Guardar' */
    console.log("- Simulando el clic en el botón 'Guardar'... -");
    await page.waitForSelector('#boton_guardar');
    await page.click('#boton_guardar');
    console.log("- Clic en el botón 'Guardar' realizado exitosamente. -");

    /* SIMULAR EVALUACION */
    console.log("- Simulando el clic en el botón 'Debe evaluar cliente'... -");
    await page.waitForSelector('#btn_evaluar');
    await page.click('#btn_evaluar');
    console.log("- Clic en el botón 'Debe evaluar cliente' realizado exitosamente. -");

    /* SIMULAR LLENADO MODAL EVALUACION CLIENTE */
    /* SELECCIONA EXPECTATIVA */
    console.log("- SIMULANDO MODAL 'Evaluacion Cliente'... -");
    await page.waitForSelector('#id_expectativa');
    await page.evaluate(() => {
        const selectExpectativa = document.querySelector('#id_expectativa');
        if (selectExpectativa && selectExpectativa.options.length > 1) {
            selectExpectativa.selectedIndex = 1; // Cambia la selección al segundo elemento
            selectExpectativa.dispatchEvent(new Event('change')); // Dispara el evento 'change' para reflejar el cambio
        }
    });
    console.log("- La primera EXPECTATIVA fue seleccionada correctamente. -");

    /* SELECCIONA RAZON DE COMPRA */
    await page.waitForSelector('#id_razon_compra');
    await page.evaluate(() => {
        const selectRazonCompra = document.querySelector('#id_razon_compra');
        if (selectRazonCompra && selectRazonCompra.options.length > 1) {
            selectRazonCompra.selectedIndex = 1; // Cambia la selección al segundo elemento
            selectRazonCompra.dispatchEvent(new Event('change')); // Dispara el evento 'change' para reflejar el cambio
        }
    });
    console.log("- La primera RAZON DE COMPRA fue seleccionada correctamente. -");


    console.log("- Llenando el campo de texto área con el contenido 'SISTEMA DE TESTING AUTOMATIZADO'... -");
    await page.waitForSelector('#comentario');
    const currentDateTime = new Date().toLocaleString();
    const textoComentario = `SISTEMA DE TESTING AUTOMATIZADO - ${currentDateTime}`;
    await page.type('#comentario', textoComentario);
    console.log("- El campo de texto área fue llenado correctamente. -");

    await page.click('#btn_guardar_evaluacion');
    console.log("- Clic en el botón 'Guardar Evaluación' realizado exitosamente. -");
    
    /* CLICK EN ALERT */
    console.log("- Esperando alerta... -");
    page.once('dialog', async dialog => {
        console.log(`- Alerta mostrada: '${dialog.message()}' -`);
        await dialog.accept(); // Aceptar la alerta
        console.log("- Alerta aceptada. -");
    });
    console.log("- Acción realizada, alerta manejada correctamente. -");


};
