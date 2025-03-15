import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registro = () => {
  const navigate = useNavigate();

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
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // Estado para manejar los pasos del formulario

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.nombre || !formData.apellidoP || !formData.telefono || !formData.email ||
      !formData.password || !formData.confirmarContraseña || !formData.sexo ||
      !formData.edad || !formData.pregunta_recuperacion || !formData.respuesta_recuperacion) {
      setError("Todos los campos son obligatorios.");
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
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }
    if (formData.password !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://servidor-bbkq.vercel.app/usuarios/registro",
        formData
      );

      if (response.status === 201) {
        setShowModal(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al registrar usuario.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "url('./imgs/cielos.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px"
      }}>
      <Container className="p-4 bg-white shadow-lg rounded" style={{ maxWidth: "500px" }}>
        <h2 className="text-center fw-bold text-success mb-3">Regístrate</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control type="text" name="apellidoP" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control type="text" name="apellidoM" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="tel" name="telefono" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" className="w-100" onClick={() => setStep(2)}>
                Siguiente
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmarContraseña"
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sexo</Form.Label>
                <Form.Select name="sexo" onChange={handleChange} required>
                  <option value="">Seleccione una opción</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control type="number" name="edad" onChange={handleChange} required />
              </Form.Group>

              <Button variant="secondary" className="w-100 mb-2" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button variant="primary" className="w-100" onClick={() => setStep(3)}>
                Siguiente
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Pregunta de recuperación</Form.Label>
                <Form.Select name="pregunta_recuperacion" onChange={handleChange} required>
                  <option value="">Seleccione una pregunta</option>
                  <option value="1">¿Cuál es el nombre de tu primera mascota?</option>
                  <option value="2">¿En qué ciudad naciste?</option>
                  <option value="3">¿Cuál es tu comida favorita?</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Respuesta de recuperación</Form.Label>
                <Form.Control type="text" name="respuesta_recuperacion" onChange={handleChange} required />
              </Form.Group>

              <Button variant="secondary" className="w-100 mb-2" onClick={() => setStep(2)}>
                Atrás
              </Button>
              <Button variant="success" type="submit" className="w-100">
                Registrarse
              </Button>
            </>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default Registro;
