
        const puppeteer = require('puppeteer');

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            await page.goto('https://www.comercialinmobiliarias.cl/gci/innovavision/');
await page.click('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '1');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '13');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '131');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '1310');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '13104');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '131042');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '1310423');
await page.type('<input type="text" class="form-control" id="rut" name="rut" value="" size="10" maxlength="8" placeholder="Rut">', '13104234');
await page.type('<input id="sel-dvrut" type="text" class="form-control" name="dvrut" value="" size="1" maxlength="1" placeholder="Dv">', '5');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'P');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Pr');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Pro');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Pros');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosa');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosai');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaic');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaico');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaico1');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaico1%');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaico1');
await page.type('<input id="sel-password" type="password" class="form-control password" name="password" placeholder="Ingrese su Contraseña">', 'Prosaico1$');
await page.click('<button id="sel-ingresar" type="submit" class="btn btn-block btn-red btn-login">
										Ingresar
										</button>');
await page.click('<button id="sel-ingresar" type="submit" class="btn btn-block btn-red btn-login">
										Ingresar
										</button>');
            
            await browser.close();
        })();
        