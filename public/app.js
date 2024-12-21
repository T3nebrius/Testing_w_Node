const socket = io();
const form = document.getElementById('scriptForm');
const logsDiv = document.getElementById('logs');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los scripts seleccionados y los par�metros
    const selectedScripts = Array.from(form.elements['selectedScripts'])
        .filter(input => input.checked)
        .map(input => input.value);
    const headless = form.elements['headless'].value;
    const resolution = form.elements['resolution'].value;

    // Enviar los datos al servidor
    const response = await fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedScripts, params: { headless, resolution } })
    });

    if (response.ok) {
        const data = await response.json();
        logsDiv.innerHTML += `<p>Scripts ejecutados con Éxito</p>`;
    } else {
        logsDiv.innerHTML += `<p>Error al ejecutar los scripts</p>`;
    }
});

// Escuchar logs en tiempo real
socket.on('log', (log) => {
    logsDiv.innerHTML += `<p>${log}</p>`;
});
