import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const QuienesSomos = () => {
  const [info, setInfo] = useState({ mision: "", vision: "", valores: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/mision-vision/ver")
      .then((response) => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setError("No se pudo cargar la información.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando información...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
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
          {/* Título Central */}
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{ color: "#2E7D32", fontSize: "3rem" }}
            >
              🌱 ¿Quiénes Somos?
            </h2>
            <p className="lead text-muted" style={{ fontSize: "1.3rem" }}>
              En <strong>InvernaTech</strong>, fusionamos la tecnología con la
              agricultura para crear soluciones inteligentes que optimicen la
              producción y el uso sostenible de los recursos.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {/* Misión */}
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
                    🌍 Nuestra Misión
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {info.mision || "No disponible"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Visión */}
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
                    🚀 Nuestra Visión
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {info.vision || "No disponible"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Valores */}
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
                    💡 Nuestros Valores
                  </Card.Title>
                  <Card.Text
                    className="text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {info.valores || "No disponible"}
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

export default QuienesSomos;
