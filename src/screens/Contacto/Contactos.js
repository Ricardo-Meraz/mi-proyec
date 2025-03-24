import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

const Contactos = () => {
  // Estado para los datos del formulario (incluyendo teléfono)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  // Estado para almacenar la información de la empresa
  const [companyInfo, setCompanyInfo] = useState(null);

  // Obtiene la información de la empresa al montar el componente
  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/empresa")
      .then((response) => {
        // Asumimos que la respuesta es un arreglo y tomamos el primer registro
        if (response.data && response.data.length > 0) {
          setCompanyInfo(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener información de la empresa:", error);
      });
  }, []);

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envía el formulario (guarda los datos del usuario)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://servidor-bbkq.vercel.app/usuarioinfo", formData);
      alert("Mensaje enviado correctamente");
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (error) {
      console.error(
        "Error al enviar mensaje:",
        error.response ? error.response.data : error
      );
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #043200 0%, rgb(233, 251, 237) 60%, #0a3b17 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Container className="mt-4 flex-grow-1">
        <h2 className="text-center fw-bold">Contáctanos</h2>
        <p className="text-center text-muted">
          Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escribe tu mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Enviar Mensaje
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Sección para mostrar la información de la empresa */}
        <Row className="mt-5 text-center">
          <Col md={4}>
            <h5>Teléfono</h5>
            <p>
              {companyInfo
                ? companyInfo.telefonoInvernaTech
                : "+52 55 1234 5678"}
            </p>
          </Col>
          <Col md={4}>
            <h5>Email</h5>
            <p>
              {companyInfo
                ? companyInfo.emailInvernaTech
                : "contacto@invernatech.com"}
            </p>
          </Col>
          <Col md={4}>
            <h5>Dirección</h5>
            <p>
              {companyInfo
                ? companyInfo.direccionInvernaTech
                : "Av. Tecnología Verde #123, CDMX, México"}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Footer pegado al final */}
      <footer
        className="text-center text-white py-3"
        style={{
          background: "linear-gradient(135deg, #043200, #0b4a1b)",
          width: "100%"
        }}
      >
        <h5 className="m-0">🌿 INVERNATECH</h5>
        <p className="m-0">
          Innovación y tecnología para la agricultura sostenible.
        </p>
      </footer>
    </div>
  );
};

export default Contactos;
