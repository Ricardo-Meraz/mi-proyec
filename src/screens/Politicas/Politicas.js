import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Politicas = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Nuestras Políticas</h2>
      <Row className="g-4">
        {/* Política de Uso */}
        <Col md={4}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Política de Uso</Card.Title>
              <Card.Text>
                <ul>
                  <li>El sitio no debe ser usado para actividades ilegales.</li>
                  <li>Prohibido copiar contenido sin autorización.</li>
                  <li>Nos reservamos el derecho de suspender cuentas por mal uso.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Política de Privacidad */}
        <Col md={4}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Política de Privacidad</Card.Title>
              <Card.Text>
                <ul>
                  <li>Protegemos tu información personal.</li>
                  <li>No compartimos datos con terceros sin tu consentimiento.</li>
                  <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Términos y Condiciones */}
        <Col md={4}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Términos y Condiciones</Card.Title>
              <Card.Text>
                <ul>
                  <li>Los precios y promociones pueden cambiar sin previo aviso.</li>
                  <li>El usuario es responsable de su cuenta y credenciales.</li>
                  <li>Nos reservamos el derecho de modificar estos términos.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Politicas;
