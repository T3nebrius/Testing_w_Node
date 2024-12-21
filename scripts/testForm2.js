module.exports = async function testFormSubmission2(page) {
    await page.goto('http://localhost:8082/gci/gi/clientes/vendedor.php');
    
    await page.type('input[name="rut_nat"]', '13981995');
    await page.type('input[name="dvrut_nat"]', '0');
    await page.type('input[name="nombre_nat"]', 'Ruben');
    await page.click('#btn_form_natural');
    
    await page.waitForSelector('#grillaCliente');
    console.log('Resultados cargados.');

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 6000)));
    const gridContent = await page.$$eval('#grillaCliente tbody tr', rows => 
        rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map(cell => cell.innerText.trim());
            }
        )
    );
    console.log("Contenido completo de la grilla después de esperar (2):\n", gridContent);
};
