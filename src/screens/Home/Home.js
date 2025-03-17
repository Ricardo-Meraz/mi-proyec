import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import invernadero from "./invernadero.jpg";
import ProductList from "../../components/cartproductos/productoslist";

const Home = () => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,rgb(106, 170, 101) 0%, rgb(205, 232, 211) 60%,rgb(91, 159, 109) 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
      }}
    >
      <Container fluid className="text-center px-4">
        <h1 style={{ color: "#4CAF50", fontWeight: "bold", marginBottom: "5px" }}>
          Bienvenido a InvernaTech
        </h1>
        <p className="mb-3">
          Descubre nuestras innovadoras soluciones para invernaderos inteligentes.
        </p>

        <Row className="mt-2 align-items-center">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <img
              src={invernadero}
              alt="Invernadero"
              style={{
                width: "85%",
                maxWidth: "450px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </Col>
          <Col
            xs={12}
            md={6}
            style={{ textAlign: "left", paddingLeft: "20px" }}
          >
            <h2
              style={{
                color: "#4CAF50",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              ¿Por qué elegir nuestros invernaderos inteligentes?
            </h2>
            <p>
              Nuestros invernaderos están diseñados para garantizar un crecimiento
              óptimo de las plantas, regulando automáticamente la temperatura,
              humedad, luz y riego.
            </p>
            <p>
              Optimizamos el uso de recursos con sistemas de riego eficientes y
              aprovechamiento de la luz natural, reduciendo costos y mejorando la
              sostenibilidad.
            </p>
            <p>
              Nos adaptamos a distintos tipos de cultivos y necesidades agrícolas,
              brindando soluciones personalizadas para cada cliente.
            </p>
            <p>
              Gracias a sensores avanzados y tecnología de automatización,
              nuestros sistemas monitorean y ajustan las condiciones del
              invernadero de forma autónoma, reduciendo la intervención manual y
              maximizando la producción.
            </p>
          </Col>
        </Row>

        <hr className="my-2" />
        <h2
          className="fw-bold text-center mb-2"
          style={{ color: "#4CAF50" }}
        >
          Productos Destacados
        </h2>
        <ProductList />
      </Container>
    </div>
  );
};

export default Home;
