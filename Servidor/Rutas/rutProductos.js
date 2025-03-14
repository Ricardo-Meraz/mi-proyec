const express = require('express');
const router = express.Router();
const Producto = require('../Models/productos');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        console.log("Buscando producto con ID:", req.params.id);
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener producto', error });
    }
});

module.exports = router;
