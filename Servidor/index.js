require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Producto = require('./Models/productos');
const conectarDB = require('./Config/database');
const Usuario = require('./Models/ModelUsuario');

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

// Obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// Obtener un producto por ID
app.get('/productos/:id', async (req, res) => {
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

// Editar un producto por ID
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const productoActualizado = await Producto.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado correctamente', producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error });
    }
});

// Eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error });
    }
});

// Obtener todos los usuarios
app.get('/ModelUsuarios', async (req, res) => {
    try {
        const ModelUsuario = await Usuario.find();
        res.json(ModelUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
});

// Registrar un usuario
app.post('/registro', async (req, res) => {
    try {
        const { nombre, apellidoP, apellidoM, telefono, email, contraseña, sexo, edad, pregunta_recuperacion, respuesta_recuperacion } = req.body;

        // Validar que no falten campos obligatorios
        if (!nombre || !apellidoP || !telefono || !email || !contraseña || !sexo || !edad || !pregunta_recuperacion || !respuesta_recuperacion) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Hashear la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            apellidoP,
            apellidoM,
            telefono,
            email,
            contraseña: contraseñaHash,
            sexo,
            edad,
            pregunta_recuperacion: {
                pre_id: 1,
                respuesta: respuesta_recuperacion
            },
            rol: "Cliente"
        });

        // Guardar usuario en la base de datos
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
    try {
        const { email, id, contraseña } = req.body;

        // Buscar usuario por email o ID
        const usuario = await Usuario.findOne({ $or: [{ email }, { _id: id }] });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar token de sesión (opcional)
        const token = jwt.sign({ id: usuario._id, email: usuario.email }, 'secreto123', { expiresIn: '1h' });

        res.json({ mensaje: 'Inicio de sesión exitoso', token, usuario });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
});

// Definir puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
