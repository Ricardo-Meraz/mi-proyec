import React, { useState, useEffect } from "react";
import { Container, Form, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();
  const API_URL = "https://servidor-bbkq.vercel.app"; // Ajusta tu URL si es distinto

  const initialFormData = {
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    telefono: "",
    email: "",
    password: "",
    confirmarContraseña: "",
    sexo: "",
    edad: "",
    pregunta_recuperacion: "",
    respuesta_recuperacion: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  // Cargar preguntas de recuperación disponibles desde el API
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${API_URL}/pregunta-recuperacion/ver`);
        setPreguntas(response.data);
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };
    fetchPreguntas();
  }, [API_URL]);

  // Manejo de inputs y cambios de estado
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectPregunta = (e) => {
    setFormData({ ...formData, pregunta_recuperacion: e.target.value });
  };

  // Validación por paso
  const validateStep = () => {
    if (step === 1) {
      // Datos personales
      if (!formData.nombre || !formData.apellidoP || !formData.telefono || !formData.email) {
        setError("Todos los campos del paso 1 son obligatorios.");
        return false;
      }
      if (!formData.email.includes("@")) {
        setError("Ingrese un correo electrónico válido.");
        return false;
      }
      if (!/^\d{10}$/.test(formData.telefono)) {
        setError("El teléfono debe tener 10 dígitos.");
        return false;
      }
    } else if (step === 2) {
      // Seguridad
      if (!formData.password || !formData.confirmarContraseña) {
        setError("Ambos campos de contraseña son obligatorios.");
        return false;
      }
      if (formData.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return false;
      }
      // Validar que la contraseña tenga al menos un carácter especial
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        setError("La contraseña debe contener al menos un carácter especial.");
        return false;
      }
      if (formData.password !== formData.confirmarContraseña) {
        setError("Las contraseñas no coinciden.");
        return false;
      }
    } else if (step === 3) {
      // Información adicional y recuperación
      if (!formData.sexo || !formData.edad || !formData.pregunta_recuperacion || !formData.respuesta_recuperacion) {
        setError("Todos los campos del paso 3 son obligatorios.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  // Navegación entre pasos
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setError(null);
    setStep(step - 1);
  };

  // Envío del formulario (último paso)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const datosAEnviar = {
      nombre: formData.nombre,
      apellidoP: formData.apellidoP,
      apellidoM: formData.apellidoM,
      telefono: formData.telefono,
      email: formData.email,
      password: formData.password,
      sexo: formData.sexo,
      edad: formData.edad,
      pregunta_recuperacion: formData.pregunta_recuperacion, // ID de la pregunta seleccionada
      respuesta_recuperacion: formData.respuesta_recuperacion,
    };

    try {
      const response = await axios.post(`${API_URL}/usuarios/registro`, datosAEnviar);
      if (response.status === 201) {
        setShowModal(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al registrar usuario.");
    }
  };

  // Renderizado de cada paso
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h4 className="mb-3">Datos Personales</h4>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control type="text" name="apellidoP" value={formData.apellidoP} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control type="text" name="apellidoM" value={formData.apellidoM} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="mb-3">Seguridad</h4>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="Ingresa la contraseña" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" name="confirmarContraseña" placeholder="Confirma la contraseña" value={formData.confirmarContraseña} onChange={handleChange} required />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="mb-3">Información Adicional</h4>
            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Select name="sexo" value={formData.sexo} onChange={handleChange} required>
                <option value="">Seleccione una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" name="edad" value={formData.edad} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pregunta de recuperación</Form.Label>
              <Form.Select name="pregunta_recuperacion" value={formData.pregunta_recuperacion} onChange={handleSelectPregunta} required>
                <option value="">Seleccione una pregunta</option>
                {preguntas.map((pregunta) => (
                  <option key={pregunta._id} value={pregunta._id}>
                    {pregunta.pregunta}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Respuesta de recuperación</Form.Label>
              <Form.Control type="text" name="respuesta_recuperacion" value={formData.respuesta_recuperacion} onChange={handleChange} required />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    // Contenedor con el degradado especificado
    <div
      style={{
        background: "linear-gradient(135deg, #043200 0%, rgb(233, 251, 237) 60%, #0a3b17 100%)",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <Container className="p-4 bg-white shadow-lg rounded" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2 className="text-center fw-bold text-success mb-3">Regístrate</h2>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        <Form onSubmit={step === 3 ? handleSubmit : handleNext}>
          {renderStep()}
          <div className="d-flex justify-content-between">
            {step > 1 && (
              <Button variant="secondary" onClick={handlePrev}>
                Anterior
              </Button>
            )}
            {step < 3 && (
              <Button variant="primary" type="submit">
                Siguiente
              </Button>
            )}
            {step === 3 && (
              <Button variant="success" type="submit">
                Registrarse
              </Button>
            )}
          </div>
        </Form>

        {/* Modal de confirmación */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registro Exitoso</Modal.Title>
          </Modal.Header>
          <Modal.Body>¡Tu cuenta ha sido creada exitosamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => { setShowModal(false); navigate("/login"); }}>
              Iniciar Sesión
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Registro;
