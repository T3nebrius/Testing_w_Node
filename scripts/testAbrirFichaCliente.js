module.exports = async function simulateClick(page) {
    await page.waitForSelector('a.btn.btn-xs.btn-default[title="Ficha Cliente"]');
    await page.click('a.btn.btn-xs.btn-default[title="Ficha Cliente"]');
    console.log("Clic en el enlace 'Ficha Cliente' realizado.");
};
