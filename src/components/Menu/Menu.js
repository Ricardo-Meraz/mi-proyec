import React from "react";
import { Offcanvas, Nav, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaBell, FaShoppingCart, FaList, FaKey, FaSignOutAlt, FaTools } from "react-icons/fa";

const Menu = ({ isOpen, onClose }) => {
    return (
        <Offcanvas show={isOpen} onHide={onClose} className="bg-warning text-dark">
            <Offcanvas.Header closeButton className="border-bottom">
                <Offcanvas.Title className="fw-bold fs-4">Menú</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
                <ListGroup variant="flush">
                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/perfil" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaUser /> Perfil
                        </Nav.Link>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/cuenta" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaKey /> Mi Cuenta
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/subscripciones" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaList /> Mis Subscripciones
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/opciones" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaTools /> Opciones
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/notificaciones" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaBell /> Notificaciones
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/productos" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaShoppingCart /> Productos
                        </Nav.Link>
                    </ListGroup.Item>

                    <ListGroup.Item className="bg-warning border-0">
                        <Nav.Link as={Link} to="/configuracion" className="d-flex align-items-center gap-3 text-dark fw-bold fs-5">
                            <FaCog /> Configuración
                        </Nav.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas.Body>

        </Offcanvas>
    );
};

export default Menu;