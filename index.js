require('dotenv').config();
const fs = require('fs');
const path = require('path');
const initializeBrowser = require('./browser');
const login = require('./scripts/login');

// Funci�n para cargar los scripts din�micamente
const loadScripts = (scriptsToRun) => {
    return scriptsToRun.map(scriptName => {
        const scriptPath = path.join(__dirname, 'scripts', `${scriptName}.js`);
        if (fs.existsSync(scriptPath)) {
            return require(scriptPath);
        } else {
            console.warn(`Script no encontrado: ${scriptName}`);
            return null;
        }
    }).filter(script => script !== null);
};

// Puedes pasar los nombres de los scripts que deseas ejecutar (sin el '.js')
const scriptsToRun = ['testForm', 'testForm2', 'otroScript']; // Ejemplo de scripts a ejecutar (agrega m�s scripts aqu� seg�n sea necesario)

(async () => {
    const { browser, page } = await initializeBrowser(false); // Cambia a true para headless
    try {
        // Ejecutar el login primero
        await login(page);

        // Cargar y ejecutar los otros scripts din�micamente
        const scripts = loadScripts(scriptsToRun);
        for (const script of scripts) {
            await script(page); // Ejecutar cada script pasando la p�gina como par�metro
        }
    } catch (error) {
        console.error('\033[32m-Error durante el testing:-\033[0m', error);
    } finally {
        await browser.close();
    }
})();
