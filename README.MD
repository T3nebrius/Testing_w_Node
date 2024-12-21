Descripcion:
Sistema de testing de regresión, el cual será utilizado para automatizar
tests de regresión con el fin de verificar la integridad de un sistema
antes de pasar cambios a producción.
La idea es que el sistema de testeo permita especificar flujos predefinidos
y que permita probar si algún cambio propuesto en la aplicación a testear
rompe algún flujo

El sistema de testeo esta basado en Node con la librería de Puppeteer, cuyo
funcionamiento es similar a Selenium

Instrucciones se instalación

* npm install
* npm init -y
* npm install puppeteer
* npm install dotenv
* npm install express
* npm install ejs  
* npm install socket.io 
* crear carpetas separando las de librerías de las principales

Funcionamiento:

node test.js

Evolución:
Se propone que este sistema de testeo pueda recibir parámetros externos
y no estar totalmente acoplado a parámetros de un archivo .env. Para ello
se esta evaluando si se maneja mediante un orquestador externo como
Karma, Jenkins o Scripiting basado en PHP.


