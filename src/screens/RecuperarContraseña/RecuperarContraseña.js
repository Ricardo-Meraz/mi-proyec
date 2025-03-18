import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecuperarContraseña = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Paso 1: Obtener la pregunta secreta en base al email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        "https://servidor-bbkq.vercel.app/usuarios/recuperar-pregunta",
        { email }
      );
      if (response.data && response.data.pregunta) {
        setPregunta(response.data.pregunta);
        setStep(2);
      } else {
        setError("Correo no encontrado.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al obtener la pregunta secreta.");
    }
  };

  // Paso 2: Verificar la respuesta secreta
  const handleRespuestaSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        "https://servidor-bbkq.vercel.app/usuarios/verificar-respuesta",
        { email, respuesta }
      );
      if (response.data && response.data.success) {
        setStep(3);
      } else {
        setError(response.data.mensaje || "Respuesta incorrecta.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al verificar la respuesta secreta.");
    }
  };

  // Paso 3: Cambiar la contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await axios.post(
        // OJO: Aquí la ruta sin ñ
        "https://servidor-bbkq.vercel.app/usuarios/cambiar-contrasena",
        { email, nuevaContraseña }
      );
      if (response.data && response.data.success) {
        setSuccess("Contraseña actualizada exitosamente. Redirigiendo al login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.mensaje || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cambiar la contraseña.");
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }} className="mt-5">
      <h2 className="text-center mb-4">Recuperar Contraseña</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      {step === 1 && (
        <Form onSubmit={handleEmailSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleRespuestaSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Pregunta Secreta</Form.Label>
            <Form.Control type="text" value={pregunta} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Respuesta</Form.Label>
            <Form.Control 
              type="text" 
              value={respuesta} 
              onChange={(e) => setRespuesta(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Verificar Respuesta
          </Button>
        </Form>
      )}

      {step === 3 && (
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              value={nuevaContraseña} 
              onChange={(e) => setNuevaContraseña(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              value={confirmarContraseña} 
              onChange={(e) => setConfirmarContraseña(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Cambiar Contraseña
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default RecuperarContraseña;
