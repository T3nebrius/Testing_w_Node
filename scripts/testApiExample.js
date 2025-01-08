const axios = require('axios');

module.exports = async function testApiRest() {
    try {
        // 1. Realizar login y obtener el token JWT
        const loginResponse = await axios.post('http://localhost:8082/api/login', {
            username: 'tu_usuario',
            password: 'tu_contraseña'
        });

        const token = loginResponse.data.token; // Asegúrate de usar el campo correcto según tu API
        console.log('Token JWT recibido:', token);

        // 2. Configurar el token en el encabezado de autorización
        const apiClient = axios.create({
            baseURL: 'http://localhost:8082/api',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // 3. Realizar una solicitud a la API protegida
        const clienteResponse = await apiClient.get('/clientes');
        console.log('Datos de clientes recibidos:', clienteResponse.data);

        // 4. Validar los datos obtenidos
        const expectedData = [
            {
                id: 830,
                rut: '11255705-9',
                nombre: 'Ruben',
                apellido: 'Apellido',
                telefono: '98620274',
                email: 'rcardenv@uc.cl',
                fecha: '27-10-2007'
            }
        ];

        const isMatch = JSON.stringify(clienteResponse.data) === JSON.stringify(expectedData);
        if (isMatch) {
            console.log('Los datos coinciden con el resultado esperado.');
        } else {
            console.error('ERROR: Los datos no coinciden.');
            console.log('Resultado esperado:', expectedData);
            console.log('Resultado obtenido:', clienteResponse.data);
        }

    } catch (error) {
        console.error('Error al realizar la verificación de la API:', error.message);
    }
};
