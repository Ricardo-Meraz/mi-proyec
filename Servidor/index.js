require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Producto = require('./Models/productos');

// Inicializar la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Servidor funcionando correctamente!');
});

app.get('/productos-test', async (req, res) => {
    try {
        const productos = await Producto.find();
        console.log('🟢 Productos encontrados:', productos);
        res.json(productos);
    } catch (error) {
        console.error('❌ Error en /productos-test:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});



// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

