import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const Politicas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const res = await axios.get("https://servidor-bbkq.vercel.app/politicas/ver");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la información.");
        setLoading(false);
      }
    };
    fetchPoliticas();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="success" />
        <p>Cargando información...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Sección principal con fondo degradado */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #043200 0%, rgb(233, 251, 237) 60%, #0a3b17 100%)",
          minHeight: "100vh",
          padding: "60px 0",
        }}
      >
        <Container className="mt-5 flex-grow-1">
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{ color: "#2E7D32", fontSize: "3rem" }}
            >
              Nuestras Políticas
            </h2>
            <p className="lead text-muted" style={{ fontSize: "1.3rem" }}>
              Conoce los lineamientos que rigen nuestra plataforma y protegen tu información.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {/* Política de Uso */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #388E3C, #2E7D32)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Política de Uso
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {data.politicaDeUso}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Política de Privacidad */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #1976D2, #1565C0)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Política de Privacidad
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {data.politicaDePrivacidad}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Términos y Condiciones */}
            <Col md={4}>
              <Card
                className="shadow-lg text-white h-100 p-4"
                style={{
                  background: "linear-gradient(135deg, #FF6F00, #E65100)",
                  borderRadius: "20px",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.07)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title className="text-center fw-bold fs-3">
                    Términos y Condiciones
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {data.terminosYCondiciones}
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
          marginTop: "100px",
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

export default Politicas;
