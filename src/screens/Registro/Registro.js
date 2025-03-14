import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Se agregó para la redirección

const Registro = () => {
  const navigate = useNavigate(); // Se instancia el hook de navegación

  const initialFormData = {
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    telefono: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    sexo: "",
    edad: "",
    pregunta_recuperacion: "",
    respuesta_recuperacion: "",
  };

  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState(initialFormData);
  // Estado para controlar el modal
  const [showModal, setShowModal] = useState(false);
  // Estados para controlar la visualización de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funciones para alternar la visualización de las contraseñas
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: la contraseña debe tener al menos 8 caracteres,
    // incluir mayúsculas, minúsculas, números y un caracter especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(formData.contraseña)) {
      alert(
        "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un caracter especial."
      );
      return;
    }

    // Validación: las contraseñas deben coincidir
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post("http://localhost:5000/registro", formData);
      // Registro exitoso: se muestra el modal y se limpian los campos
      setShowModal(true);
      setFormData(initialFormData);
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al registrar usuario");
    }
  };

  // Estilos en línea
  const styles = {
    backgroundImage: "url('./imgs/cielos.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(13, 4, 4, 0.5)",
    zIndex: 1,
  };

  const contentStyles = {
    position: "relative",
    zIndex: 2,
  };

  return (
    <div style={styles}>
      <div style={overlayStyles}></div>
      <Container style={contentStyles} className="mt-4 p-5 text-dark">
        <Row className="justify-content-center">
          <Col md={6} className="bg-white p-4 rounded shadow">
            <h2 className="text-center fw-bold">Regístrate</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  required
                  value={formData.nombre}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidoP"
                  onChange={handleChange}
                  required
                  value={formData.apellidoP}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  type="text"
                  name="apellidoM"
                  onChange={handleChange}
                  value={formData.apellidoM}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  onChange={handleChange}
                  required
                  value={formData.telefono}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={formData.email}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="contraseña"
                    onChange={handleChange}
                    required
                    value={formData.contraseña}
                  />
                  <span
                    onClick={togglePassword}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    👁️
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
                    value={formData.confirmarContraseña}
                  />
                  <span
                    onClick={toggleConfirmPassword}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    👁️
                  </span>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="sexo"
                  onChange={handleChange}
                  required
                  value={formData.sexo}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  name="edad"
                  onChange={handleChange}
                  required
                  value={formData.edad}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pregunta de recuperación</Form.Label>
                <Form.Select
                  name="pregunta_recuperacion"
                  onChange={handleChange}
                  required
                  value={formData.pregunta_recuperacion}
                >
                  <option value="">Seleccione una pregunta</option>
                  <option value="1">
                    ¿Cuál es el nombre de tu primera mascota?
                  </option>
                  <option value="2">¿En qué ciudad naciste?</option>
                  <option value="3">¿Cuál es tu comida favorita?</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Respuesta de recuperación</Form.Label>
                <Form.Control
                  type="text"
                  name="respuesta_recuperacion"
                  onChange={handleChange}
                  required
                  value={formData.respuesta_recuperacion}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Registrarse
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Usuario registrado con éxito.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              navigate("/login"); // Se redirige a login.js al presionar Aceptar
            }}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Registro;
