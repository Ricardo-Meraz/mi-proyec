import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Registro = () => {
  // Estilos en línea
  const styles = {
    backgroundImage: "url('./imgs/cielos.jpg')", // Cambia esto por la ruta de tu imagen
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
    backgroundColor: "rgba(13, 4, 4, 0.5)", // Overlay semi-transparente
    zIndex: 1,
  };

  const contentStyles = {
    position: "relative",
    zIndex: 2,
  };

  return (
    <div style={styles}>
      {/* Overlay para mejorar la legibilidad */}
      <div style={overlayStyles}></div>

      {/* Contenido del formulario */}
      <Container style={contentStyles} className="mt-4 p-5 text-dark">
        <Row className="justify-content-center">
          <Col md={6} className="bg-white p-4 rounded shadow">
            <h2 className="text-center fw-bold">Regístrate</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Crea una contraseña" />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Registrarse
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registro;
