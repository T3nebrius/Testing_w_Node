const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const actions = [];

    // Expose function to capture clicks and add them to actions
    await page.exposeFunction('captureClick', (selector) => {
        actions.push(`await page.click('${selector}');`);
        console.log(`Clic capturado en: ${selector}`);
    });

    // Expose function to capture input events
    await page.exposeFunction('captureInput', (selector, value) => {
        actions.push(`await page.type('${selector}', '${value}');`);
        console.log(`Entrada capturada en: ${selector}, valor: ${value}`);
    });

    // Evaluate script to track events on the page
    await page.evaluateOnNewDocument(() => {
        // Utility function to generate a valid selector
        const getSelector = (element) => {
            if (element.id) return `#${element.id}`;
            if (element.className) return `.${element.className.split(' ').join('.')}`;
            return element.tagName.toLowerCase();
        };

        // Capture click events
        document.addEventListener(
            'click',
            (event) => {
                event.preventDefault();
                const selector = getSelector(event.target);
                if (selector) {
                    window.captureClick(selector);
                }
            },
            true
        );

        // Capture input events
        document.addEventListener(
            'input',
            (event) => {
                const selector = getSelector(event.target);
                if (selector && event.target.value) {
                    window.captureInput(selector, event.target.value);
                }
            },
            true
        );
    });

    // Go to the target page
    await page.goto('http://www.gmail.com'); // Cambia esta URL a la de tu aplicación

    // Espera a que termines tus interacciones
    console.log('Interactúa con la página. Cierra el navegador cuando termines.');
    await browser.on('disconnected', () => {
        // Generate the script file
        const scriptContent = `
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    ${actions.join('\n    ')}
    await browser.close();
})();
        `;

        fs.writeFileSync('generatedScript.js', scriptContent);
        console.log('Archivo generado: generatedScript.js');
    });
})();
