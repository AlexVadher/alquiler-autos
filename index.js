const express = require('express');
const connect = require('./config/db.js'); // Conexión a la base de datos
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes.js'); // Rutas de usuarios
const reservationRouter = require('./routes/reservationRoutes.js'); // Rutas de reservas
const carRouter = require('./routes/carRoutes.js'); // Rutas de autos
const cors = require('cors');

dotenv.config();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permitir todas las solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

const app = express();
const port = process.env.PORT || 3001;

app.use(cors(corsOptions));

// Middleware para que el servidor entienda JSON
app.use(express.json());

// Middleware para las rutas
app.use('/api/users', userRouter); // Rutas de usuarios
app.use('/api/reservations', reservationRouter); // Rutas de reservas
app.use('/api/cars', carRouter); // Rutas de autos

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de Alquiler de Autos');
});

// Configuración del servidor
const server = async () => {
    try {
        // Conectar a la base de datos
        await connect();
        console.log('Conexión exitosa a la base de datos');

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

server(); // Inicia el servidor
