import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AdminPoliticas = () => {
  const API_URL = "https://servidor-bbkq.vercel.app";
  const [politicas, setPoliticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    politicaDeUso: "",
    politicaDePrivacidad: "",
    terminosYCondiciones: "",
  });

  // Obtener las políticas al montar el componente
  useEffect(() => {
    fetchPoliticas();
  }, []);

  const fetchPoliticas = async () => {
    try {
      const response = await axios.get(`${API_URL}/politicas/ver`);
      setPoliticas(response.data);
      setFormData({
        politicaDeUso: response.data.politicaDeUso,
        politicaDePrivacidad: response.data.politicaDePrivacidad,
        terminosYCondiciones: response.data.terminosYCondiciones,
      });
      setLoading(false);
    } catch (err) {
      setError("Error al cargar las políticas.");
      setLoading(false);
    }
  };

  // Manejar edición: abre el modal
  const handleEdit = () => {
    setShowEditModal(true);
  };

  // Manejar eliminación
  const handleDelete = async () => {
    if (window.confirm("¿Está seguro de eliminar las políticas?")) {
      try {
        await axios.delete(`${API_URL}/politicas/eliminar/${politicas._id}`);
        setPoliticas(null);
      } catch (err) {
        setError("Error al eliminar las políticas.");
      }
    }
  };

  // Manejo de cambios en el formulario del modal
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envío del formulario para actualizar
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/politicas/actualizar/${politicas._id}`,
        formData
      );
      // Actualiza el estado con las políticas actualizadas
      setPoliticas(response.data.politicas);
      setShowEditModal(false);
    } catch (err) {
      setError("Error al actualizar las políticas.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Administración de Políticas</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {loading ? (
        <p className="text-center">Cargando políticas...</p>
      ) : politicas ? (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center fw-bold">Políticas</Card.Title>
            <p>
              <strong>Política de Uso:</strong> {politicas.politicaDeUso}
            </p>
            <p>
              <strong>Política de Privacidad:</strong> {politicas.politicaDePrivacidad}
            </p>
            <p>
              <strong>Términos y Condiciones:</strong> {politicas.terminosYCondiciones}
            </p>
            <div className="d-flex justify-content-end">
              <Button variant="warning" className="me-2" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center">No hay políticas registradas.</p>
      )}

      {/* Modal para editar las políticas */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Políticas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Política de Uso</Form.Label>
              <Form.Control
                type="text"
                name="politicaDeUso"
                value={formData.politicaDeUso}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Política de Privacidad</Form.Label>
              <Form.Control
                type="text"
                name="politicaDePrivacidad"
                value={formData.politicaDePrivacidad}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Términos y Condiciones</Form.Label>
              <Form.Control
                type="text"
                name="terminosYCondiciones"
                value={formData.terminosYCondiciones}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPoliticas;
