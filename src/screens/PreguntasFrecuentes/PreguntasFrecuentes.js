import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Accordion } from "react-bootstrap";
import axios from "axios";

const PreguntasFrecuentes = () => {
  const [preguntaInput, setPreguntaInput] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("https://servidor-bbkq.vercel.app/faq");
      setFaqs(response.data);
    } catch (error) {
      setMensaje("Error al cargar las FAQs.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!preguntaInput.trim()) {
      setMensaje("La pregunta es obligatoria.");
      return;
    }
    try {
      await axios.post("https://servidor-bbkq.vercel.app/faq", {
        pregunta: preguntaInput,
        respuesta: ""
      });
      setMensaje("Pregunta enviada correctamente.");
      setPreguntaInput("");
      fetchFaqs();
    } catch (error) {
      setMensaje("Error al enviar la pregunta.");
      console.error(error);
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
      {/* Contenedor principal: ocupa el espacio disponible */}
      <Container className="mt-4 flex-grow-1">
        <h2 className="text-center">Preguntas Frecuentes</h2>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group controlId="pregunta">
            <Form.Label>Haz tu pregunta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe tu pregunta..."
              value={preguntaInput}
              onChange={(e) => setPreguntaInput(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Enviar Pregunta
          </Button>
        </Form>

        <h4>Listado de Preguntas</h4>
        {faqs.length > 0 ? (
          <Accordion defaultActiveKey="0">
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={faq._id}>
                <Accordion.Header>{faq.pregunta}</Accordion.Header>
                <Accordion.Body>
                  <strong>Respuesta:</strong>{" "}
                  {faq.respuesta ? faq.respuesta : "Sin respuesta"}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p>No hay preguntas registradas.</p>
        )}
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

export default PreguntasFrecuentes;
