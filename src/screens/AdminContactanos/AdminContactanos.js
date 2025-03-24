import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert } from "react-bootstrap";
import axios from "axios";

const AdminContactanos = () => {
  // Estado para la información de la empresa
  const [companyInfo, setCompanyInfo] = useState(null);
  const [editCompany, setEditCompany] = useState(false);
  const [companyMessage, setCompanyMessage] = useState("");

  // Estado para los mensajes de usuarios
  const [userMessages, setUserMessages] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");

  // Cargar la información de la empresa al montar el componente
  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/empresa")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCompanyInfo(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener información de la empresa:", error);
      });
  }, []);

  // Cargar los mensajes de usuarios (usando la ruta GET /usuarioinfo para evitar problemas con el middleware)
  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/usuarioinfo")
      .then((response) => {
        setUserMessages(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener mensajes de usuarios:", error);
      });
  }, []);

  // Manejar la actualización de la información de la empresa
  const handleCompanyUpdate = () => {
    if (!companyInfo || !companyInfo._id) return;
    axios
      .put(`https://servidor-bbkq.vercel.app/empresa/${companyInfo._id}`, companyInfo)
      .then((response) => {
        setCompanyInfo(response.data);
        setCompanyMessage("Empresa actualizada correctamente");
        setEditCompany(false);
      })
      .catch((error) => {
        console.error("Error al actualizar empresa:", error);
        setCompanyMessage("Error al actualizar la empresa");
      });
  };

  // Manejar la eliminación de la información de la empresa
  const handleCompanyDelete = () => {
    if (!companyInfo || !companyInfo._id) return;
    if (window.confirm("¿Estás seguro de eliminar la información de la empresa?")) {
      axios
        .delete(`https://servidor-bbkq.vercel.app/empresa/${companyInfo._id}`)
        .then(() => {
          setCompanyInfo(null);
          setCompanyMessage("Empresa eliminada correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar empresa:", error);
          setCompanyMessage("Error al eliminar la empresa");
        });
    }
  };

  // Manejar la eliminación de un mensaje de usuario
  const handleDeleteMessage = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este mensaje?")) {
      axios
        .delete(`https://servidor-bbkq.vercel.app/usuarioinfo/${id}`)
        .then(() => {
          setUserMessages((prev) => prev.filter((msg) => msg._id !== id));
          setAlertMsg("Mensaje eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar mensaje:", error);
          setAlertMsg("Error al eliminar el mensaje");
        });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Administrar Contactanos</h2>

      {/* Sección de Información de la Empresa */}
      <Row className="mt-4">
        <Col>
          <h4>Información de la Empresa</h4>
          {companyMessage && <Alert variant="info">{companyMessage}</Alert>}
          {companyInfo ? (
            <Form>
              <Form.Group className="mb-3" controlId="emailInvernaTech">
                <Form.Label>Email Invernatech</Form.Label>
                <Form.Control
                  type="email"
                  value={companyInfo.emailInvernaTech}
                  readOnly={!editCompany}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      emailInvernaTech: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="telefonoInvernaTech">
                <Form.Label>Teléfono Invernatech</Form.Label>
                <Form.Control
                  type="text"
                  value={companyInfo.telefonoInvernaTech}
                  readOnly={!editCompany}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      telefonoInvernaTech: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="direccionInvernaTech">
                <Form.Label>Dirección Invernatech</Form.Label>
                <Form.Control
                  type="text"
                  value={companyInfo.direccionInvernaTech}
                  readOnly={!editCompany}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      direccionInvernaTech: e.target.value,
                    })
                  }
                />
              </Form.Group>
              {editCompany ? (
                <>
                  <Button
                    variant="primary"
                    onClick={handleCompanyUpdate}
                    className="me-2"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setEditCompany(false)}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="warning"
                    onClick={() => setEditCompany(true)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button variant="danger" onClick={handleCompanyDelete}>
                    Eliminar
                  </Button>
                </>
              )}
            </Form>
          ) : (
            <p>No hay información de la empresa registrada.</p>
          )}
        </Col>
      </Row>

      {/* Sección de Mensajes de Usuarios */}
      <Row className="mt-5">
        <Col>
          <h4>Mensajes de Usuarios</h4>
          {alertMsg && <Alert variant="info">{alertMsg}</Alert>}
          {userMessages.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Mensaje</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {userMessages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.nombre}</td>
                    <td>{msg.email}</td>
                    <td>{msg.telefono}</td>
                    <td>{msg.mensaje}</td>
                    <td>{new Date(msg.fecha).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteMessage(msg._id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay mensajes de usuarios.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminContactanos;
