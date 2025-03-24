import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../screens/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchPerfil = async () => {
      try {
        // Asegúrate de que en tu backend se haga populate('pregunta_recuperacion.pre_id')
        const response = await axios.get(`https://servidor-bbkq.vercel.app/usuarios/${user._id}`);
        console.log("Perfil obtenido:", response.data);
        setPerfil(response.data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchPerfil();
  }, [user]);

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

  const handleEditarPerfil = () => {
    navigate('/EditarPerfil');
  };

  const preguntaRecuperacion =
    perfil.pregunta_recuperacion?.pre_id?.pregunta ||
    "No disponible";

  return (
    // Contenedor con fondo degradado y altura mínima para cubrir toda la ventana
    <div
      style={{
        background: "linear-gradient(135deg, #043200 0%, rgb(233, 251, 237) 60%, #0a3b17 100%)",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <Container style={{ maxWidth: '600px' }} className="mt-4">
        <h2 className="text-center mb-4">Perfil de Usuario</h2>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={perfil.nombre || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido Paterno</Form.Label>
            <Form.Control type="text" value={perfil.apellidoP || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido Materno</Form.Label>
            <Form.Control type="text" value={perfil.apellidoM || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" value={perfil.telefono || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={perfil.email || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sexo</Form.Label>
            <Form.Control type="text" value={perfil.sexo || ''} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="number" value={perfil.edad || ''} readOnly />
          </Form.Group>

          {/* Contraseña enmascarada */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value="********" readOnly />
          </Form.Group>

          {/* Pregunta de Recuperación */}
          <Form.Group className="mb-3">
            <Form.Label>Pregunta de Recuperación</Form.Label>
            <Form.Control 
              type="text" 
              value={preguntaRecuperacion}
              readOnly 
            />
          </Form.Group>

          <Button variant="primary" className="w-100" onClick={handleEditarPerfil}>
            Editar Perfil
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Perfil;
