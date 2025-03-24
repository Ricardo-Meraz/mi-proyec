import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../screens/UserContext/UserContext';

const EditarPerfil = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = "https://servidor-bbkq.vercel.app";

  // Estado para datos básicos del perfil y pregunta de recuperación existente
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    email: '',
    sexo: '',
    edad: '',
    pregunta_recuperacion: {} // se espera que tenga, por ejemplo, { pre_id: { _id, pregunta }, respuesta: "..." }
  });

  // Estados para la edición de contraseña
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para editar la pregunta de recuperación: dropdown para seleccionar y campo para la respuesta
  const [preguntas, setPreguntas] = useState([]);
  const [selectedPregunta, setSelectedPregunta] = useState('');
  const [newRecoveryAnswer, setNewRecoveryAnswer] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar datos del perfil actual
  useEffect(() => {
    if (!user) return;
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios/${user._id}`);
        setPerfil(response.data);
        // Si ya tiene una pregunta de recuperación asignada, la ponemos en el dropdown
        if (response.data.pregunta_recuperacion && response.data.pregunta_recuperacion.pre_id) {
          setSelectedPregunta(response.data.pregunta_recuperacion.pre_id._id);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del perfil.');
      }
    };
    fetchPerfil();
  }, [user]);

  // Cargar preguntas de recuperación disponibles
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${API_URL}/pregunta-recuperacion/ver`);
        setPreguntas(response.data);
      } catch (err) {
        console.error("Error al cargar las preguntas de recuperación:", err);
      }
    };
    fetchPreguntas();
  }, []);

  // Manejo de cambios en los datos básicos
  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    });
  };

  // Envío del formulario para actualizar el perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Si se ingresó nueva contraseña, validarla
    if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Armar el objeto de actualización
    const updateData = {
      ...perfil
    };

    if (newPassword) {
      updateData.password = newPassword;
    }

    // Si se ha seleccionado una pregunta y se ingresa respuesta, actualizar la recuperación
    if (selectedPregunta && newRecoveryAnswer) {
      updateData.pregunta_recuperacion = {
        pre_id: selectedPregunta,
        respuesta: newRecoveryAnswer
      };
    }

    try {
      const response = await axios.put(`${API_URL}/usuarios/${user._id}`, updateData);
      setSuccess(response.data.mensaje || "Perfil actualizado exitosamente.");
      // Actualizar el contexto (opcional)
      setUser(response.data.usuario || { ...user, ...updateData });
      setTimeout(() => {
        navigate('/perfil');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el perfil.");
    }
  };

  if (!user) {
    return (
      <Container className="mt-4">
        <h4>No has iniciado sesión.</h4>
      </Container>
    );
  }

  if (!perfil) {
    return (
      <Container className="mt-4">
        <h4>Cargando perfil...</h4>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "600px" }} className="mt-4">
      <h2 className="text-center mb-4">Editar Perfil</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Datos Personales */}
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formApellidoP">
          <Form.Label>Apellido Paterno</Form.Label>
          <Form.Control
            type="text"
            name="apellidoP"
            value={perfil.apellidoP}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formApellidoM">
          <Form.Label>Apellido Materno</Form.Label>
          <Form.Control
            type="text"
            name="apellidoM"
            value={perfil.apellidoM}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={perfil.telefono}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSexo">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            name="sexo"
            value={perfil.sexo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEdad">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            name="edad"
            value={perfil.edad}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Edición de contraseña */}
        <Form.Group className="mb-3" controlId="formNuevaContraseña">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa la nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConfirmarContraseña">
          <Form.Label>Confirmar Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma la nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {/* Edición de pregunta de recuperación */}
        <Form.Group className="mb-3" controlId="formPreguntaRecuperacion">
          <Form.Label>Pregunta de Recuperación</Form.Label>
          <Form.Select
            name="pregunta_recuperacion"
            value={selectedPregunta}
            onChange={(e) => setSelectedPregunta(e.target.value)}
            required
          >
            <option value="">Seleccione una pregunta</option>
            {preguntas.map((p) => (
              <option key={p._id} value={p._id}>
                {p.pregunta}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRespuestaRecuperacion">
          <Form.Label>Respuesta de Recuperación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la nueva respuesta de recuperación"
            value={newRecoveryAnswer}
            onChange={(e) => setNewRecoveryAnswer(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarPerfil;
