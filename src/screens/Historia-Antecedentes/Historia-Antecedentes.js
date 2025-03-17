import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HistoriaAntecedentes = () => {
  const [historia, setHistoria] = useState("");
  const [antecedentes, setAntecedentes] = useState("");

  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/historial-antecedentes/ver")
      .then((response) => {
        if (response.data) {
          setHistoria(response.data.historial);
          setAntecedentes(response.data.antecedentes);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Sección principal con fondo degradado */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #043200 0%, rgb(233, 251, 237) 60%, #0a3b17 100%)",
          minHeight: "100vh",
          padding: "60px 0",
        }}
      >
        <Container className="text-center flex-grow-1 mt-5">
          <h2 className="fw-bold text-success">
            📜 Historia y Antecedentes
          </h2>
          <p className="text-muted fs-5">
            Conoce más sobre nuestros orígenes y el camino que hemos recorrido en
            el mundo de la tecnología agrícola.
          </p>

          <Row className="mt-4 justify-content-center gap-4">
            {/* Historia */}
            <Col md={5}>
              <Card
                className="shadow-lg border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    📖 Nuestra Historia
                  </Card.Title>
                  <Card.Text className="text-light fs-5 text-justify">
                    {historia || "Cargando información..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Antecedentes */}
            <Col md={5}>
              <Card
                className="shadow-lg border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #8D6E63, #A1887F)",
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    🏛️ Antecedentes
                  </Card.Title>
                  <Card.Text className="text-light fs-5 text-justify">
                    {antecedentes || "Cargando información..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Fijo */}
      <footer
        className="mt-auto text-center text-white py-3"
        style={{
          background: "linear-gradient(135deg, #043200, #0b4a1b)",
          marginTop: "100px", // Incrementa el margen superior para bajarlo más
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

export default HistoriaAntecedentes;
