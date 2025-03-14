const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../Models/ModelUsuario');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
});

// Registrar un usuario
router.post('/registro', async (req, res) => {
    try {
        const { nombre, apellidoP, apellidoM, telefono, email, contraseña, sexo, edad, pregunta_recuperacion } = req.body;

        // Validar que no falten campos obligatorios
        if (!nombre || !apellidoP || !telefono || !email || !contraseña || !sexo || !edad || !pregunta_recuperacion?.pre_id || !pregunta_recuperacion?.respuesta) {
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
            pregunta_recuperacion, // Aquí ya debe venir en el formato { pre_id, respuesta }
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

module.exports = router;
