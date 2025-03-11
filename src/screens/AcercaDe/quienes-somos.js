import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";

const QuienesSomos = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-success">Quiénes Somos</h2>
      <p className="text-center">
        En <strong>InvernaTech</strong>, nos dedicamos a la innovación en tecnología agrícola, 
        ofreciendo soluciones inteligentes para mejorar la eficiencia en los invernaderos.
      </p>

      <Row className="mt-4">
        {/* Misión */}
        <Col md={6} className="mb-4">
          <Card className="shadow-lg" style={{ backgroundColor: "#8D6E63", color: "white" }}>
            <Card.Body>
              <Card.Title className="text-center text-warning">🌱 Nuestra Misión</Card.Title>
              <Card.Text>
                Proporcionar herramientas tecnológicas avanzadas que optimicen el 
                crecimiento de cultivos dentro de invernaderos, promoviendo la 
                sostenibilidad y la eficiencia en la producción agrícola.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Visión */}
        <Col md={6} className="mb-4">
          <Card className="shadow-lg" style={{ backgroundColor: "#4CAF50", color: "white" }}>
            <Card.Body>
              <Card.Title className="text-center text-warning">🚀 Nuestra Visión</Card.Title>
              <Card.Text>
                Ser líderes en el desarrollo de sistemas inteligentes para invernaderos, 
                transformando la agricultura mediante la automatización y la inteligencia artificial.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Historial */}
        <Col md={6} className="mb-4">
          <Card className="shadow-lg" style={{ backgroundColor: "#795548", color: "white" }}>
            <Card.Body>
              <Card.Title className="text-center text-warning">📜 Historial</Card.Title>
              <Card.Text>
                Desde nuestra fundación en 2020, InvernaTech ha trabajado con agricultores para 
                mejorar el rendimiento de sus cultivos a través de la innovación tecnológica.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Antecedentes */}
        <Col md={6} className="mb-4">
          <Card className="shadow-lg" style={{ backgroundColor: "#2E7D32", color: "white" }}>
            <Card.Body>
              <Card.Title className="text-center text-warning">🏛️ Antecedentes</Card.Title>
              <Card.Text>
                Nuestro equipo está compuesto por expertos en tecnología agrícola, 
                ingeniería y automatización, con el objetivo de revolucionar la forma 
                en que se gestionan los invernaderos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QuienesSomos;
