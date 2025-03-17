import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdmQuienesSomos = () => {
  const API_URL = "https://servidor-bbkq.vercel.app";
  const [misionVision, setMisionVision] = useState(null);
  const [historial, setHistorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener la información de ambas secciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMision = await axios.get(`${API_URL}/mision-vision/ver`);
        const resHistorial = await axios.get(`${API_URL}/historial-antecedentes/ver`);
        setMisionVision(resMision.data);
        setHistorial(resHistorial.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener la información.");
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  // Redirigir al formulario de edición en EditarQuienesSomos
  const handleEditClick = (section, data) => {
    navigate(`/editar-quienes-somos/${section}/${data._id}`);
  };

  // Manejo de acciones: Eliminar
  const handleDelete = async (section, id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        if (section === "misionVision") {
          await axios.delete(`${API_URL}/mision-vision/eliminar/${id}`);
          setMisionVision(null);
        } else if (section === "historial") {
          await axios.delete(`${API_URL}/historial-antecedentes/eliminar/${id}`);
          setHistorial(null);
        }
      } catch (err) {
        setError("Error al eliminar el registro.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Administración de Quiénes Somos</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loading ? (
        <p className="text-center">Cargando información...</p>
      ) : (
        <Row>
          {/* Tarjeta de Misión, Visión y Valores */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Misión, Visión y Valores</h4>
              </Card.Header>
              <Card.Body>
                {misionVision ? (
                  <>
                    <p>
                      <strong>Misión:</strong> {misionVision.mision}
                    </p>
                    <p>
                      <strong>Visión:</strong> {misionVision.vision}
                    </p>
                    <p>
                      <strong>Valores:</strong> {misionVision.valores}
                    </p>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditClick("misionVision", misionVision)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete("misionVision", misionVision._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-center">No hay información registrada.</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta de Historial y Antecedentes */}
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">Historial y Antecedentes</h4>
              </Card.Header>
              <Card.Body>
                {historial ? (
                  <>
                    <p>
                      <strong>Historial:</strong> {historial.historial}
                    </p>
                    <p>
                      <strong>Antecedentes:</strong> {historial.antecedentes}
                    </p>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditClick("historial", historial)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete("historial", historial._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-center">No hay información registrada.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdmQuienesSomos;
