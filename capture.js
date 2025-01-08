const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const actions = [];

    // Capturar navegación
    page.on('framenavigated', frame => {
        if (frame === page.mainFrame()) {
            const url = frame.url();
            actions.push(`await page.goto('${url}');`);
            console.log(`Navegación capturada: ${url}`);
        }
    });

    // Capturar clics
    await page.exposeFunction('captureClick', (selector) => {
        actions.push(`await page.click('${selector}');`);
        console.log(`Clic capturado en: ${selector}`);
    });

    await page.evaluateOnNewDocument(() => {
        document.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            window.captureClick(event.target.outerHTML); // Capturar selector aproximado
        }, true);
    });

    // Capturar escritura
    page.on('domcontentloaded', async () => {
        await page.exposeFunction('captureType', (selector, value) => {
            actions.push(`await page.type('${selector}', '${value}');`);
            console.log(`Escritura capturada en: ${selector}`);
        });

        await page.evaluate(() => {
            document.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', (event) => {
                    window.captureType(event.target.outerHTML, event.target.value);
                });
            });
        });
    });

    // Deja al usuario interactuar y espera acciones
    console.log("Inicia tus interacciones en el navegador.");
    setTimeout(async () => {
        // Finaliza y genera archivo
        const scriptContent = `
        const puppeteer = require('puppeteer');

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            ${actions.join('\n')}
            
            await browser.close();
        })();
        `;
        fs.writeFileSync('testGenerated.js', scriptContent);
        console.log("Archivo generado: testGenerated.js");
        await browser.close();
    }, 60000); // 1 minuto para realizar las acciones
})();
