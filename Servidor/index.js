require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Producto = require('./Models/productos');
const conectarDB = require('./Config/database');

// Conectar a la base de datos
conectarDB();

// Inicializar la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Servidor funcionando correctamente!');
});


app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});



// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
