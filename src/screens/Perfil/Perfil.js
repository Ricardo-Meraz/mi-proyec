import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../screens/UserContext/UserContext'; // Ajusta la ruta si difiere
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);

  // Al montar el componente, si hay un user logeado, 
  // llama al backend para obtener sus datos completos
  useEffect(() => {
    if (!user) return;

    const fetchPerfil = async () => {
      try {
        // Llama a la ruta GET /usuarios/:id con el ID del usuario
        const response = await axios.get(
          `https://servidor-bbkq.vercel.app/usuarios/${user._id}`
        );
        // Guarda la info en el estado 'perfil'
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
      }
    };

    fetchPerfil();
  }, [user]);

  // Si no hay usuario logeado, muestra un mensaje o redirige
  if (!user) {
    return (
      <Container className="mt-4">
        <h4>No has iniciado sesión.</h4>
      </Container>
    );
  }

  // Mientras cargan los datos, muestra un mensaje de "Cargando..."
  if (!perfil) {
    return (
      <Container className="mt-4">
        <h4>Cargando perfil...</h4>
      </Container>
    );
  }

  // Maneja el clic en "Editar Perfil"
  const handleEditarPerfil = () => {
    // Aquí puedes navegar a otra ruta, por ejemplo /editar-perfil
    navigate('/EditarPerfil');
  };

  return (
    <Container style={{ maxWidth: '600px' }} className="mt-4">
      <h2 className="text-center mb-4">Perfil de Usuario</h2>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={perfil.nombre || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido Paterno</Form.Label>
          <Form.Control
            type="text"
            value={perfil.apellidoP || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido Materno</Form.Label>
          <Form.Control
            type="text"
            value={perfil.apellidoM || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            value={perfil.telefono || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={perfil.email || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            type="text"
            value={perfil.sexo || ''}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            value={perfil.edad || ''}
            readOnly
          />
        </Form.Group>

        <Button
          variant="primary"
          className="w-100"
          onClick={handleEditarPerfil}
        >
          Editar Perfil
        </Button>
      </Form>
    </Container>
  );
};

export default Perfil;
