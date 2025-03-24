import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AdminFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [respuestaInput, setRespuestaInput] = useState("");

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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta FAQ?")) {
      try {
        await axios.delete(`https://servidor-bbkq.vercel.app/faq/${id}`);
        setMensaje("FAQ eliminada correctamente.");
        fetchFaqs();
      } catch (error) {
        console.error("Error al eliminar FAQ:", error);
        setMensaje("Error al eliminar la FAQ.");
      }
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setRespuestaInput(faq.respuesta);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setRespuestaInput("");
  };

  const handleSaveAnswer = async (id) => {
    try {
      await axios.put(`https://servidor-bbkq.vercel.app/faq/${id}`, {
        respuesta: respuestaInput
      });
      setMensaje("FAQ actualizada correctamente.");
      setEditingId(null);
      setRespuestaInput("");
      fetchFaqs();
    } catch (error) {
      console.error("Error al actualizar FAQ:", error);
      setMensaje("Error al actualizar la FAQ.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Administrar FAQ</h2>
      {mensaje && <Alert variant="info">{mensaje}</Alert>}
      {faqs.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq.pregunta}</td>
                <td>
                  {editingId === faq._id ? (
                    <Form.Control
                      type="text"
                      value={respuestaInput}
                      onChange={(e) => setRespuestaInput(e.target.value)}
                    />
                  ) : (
                    faq.respuesta || "Sin respuesta"
                  )}
                </td>
                <td>
                  {editingId === faq._id ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSaveAnswer(faq._id)}
                        className="me-2"
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(faq)}
                        className="me-2"
                      >
                        Contestar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(faq._id)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay FAQs registradas.</p>
      )}
    </Container>
  );
};

export default AdminFaq;
