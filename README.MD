Descripcion:
Sistema de testing de regresi�n, el cual ser� utilizado para automatizar
tests de regresi�n con el fin de verificar la integridad de un sistema
antes de pasar cambios a producci�n.
La idea es que el sistema de testeo permita especificar flujos predefinidos
y que permita probar si alg�n cambio propuesto en la aplicaci�n a testear
rompe alg�n flujo

El sistema de testeo esta basado en Node con la librer�a de Puppeteer, cuyo
funcionamiento es similar a Selenium

Instrucciones se instalaci�n

* npm install
* npm init -y
* npm install puppeteer
* npm install dotenv
* npm install express
* crear carpetas separando las de librer�as de las principales

Funcionamiento:

node test.js

Evoluci�n:
Se propone que este sistema de testeo pueda recibir par�metros externos
y no estar totalmente acoplado a par�metros de un archivo .env. Para ello
se esta evaluando si se maneja mediante un orquestador externo como
Karma, Jenkins o Scripiting basado en PHP.


