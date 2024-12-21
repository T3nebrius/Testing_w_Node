require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const initializeBrowser = require('./browser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos est�ticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal para la interfaz
app.get('/', (req, res) => {
    // Leer los scripts disponibles en la carpeta "/scripts"
    const scripts = fs.readdirSync(path.join(__dirname, 'scripts')).map(file => file.replace('.js', ''));
    res.render('index', { scripts });
});

// Endpoint para ejecutar los scripts seleccionados
app.post('/run', async (req, res) => {
    const { selectedScripts, params } = req.body; // Scripts seleccionados y par�metros personalizados

    const logs = [];
    const io = req.app.get('io'); // Accede a Socket.IO

    try {
        const { browser, page } = await initializeBrowser(params.headless === 'true');
        // Ejecutar login primero
        const login = require(`./scripts/login`);
        await login(page);
        logs.push('Login ejecutado correctamente.');
        io.emit('log', 'Login ejecutado correctamente.');

        // Ejecutar los scripts seleccionados
        for (const scriptName of selectedScripts) {
            const script = require(`./scripts/${scriptName}`);
            logs.push(`Ejecutando script: ${scriptName}...`);
            io.emit('log', `Ejecutando script: ${scriptName}...`);
            await script(page);
        }

        res.json({ success: true, logs });
    } catch (error) {
        logs.push(`Error: ${error.message}`);
        io.emit('log', `Error: ${error.message}`);
        res.status(500).json({ success: false, logs });
    }
});

// Iniciar el servidor y configurar Socket.IO
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const io = new Server(server);
app.set('io', io);

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
