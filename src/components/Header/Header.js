import React, { useState } from "react";
import { Container, Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import Sidebar from "../Menu/Menu";
import logo from "./logo.jpg";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Navbar expand="lg" className="py-3" style={{
                background: "linear-gradient(135deg, #043200 0%, #0b4a1b 50%, #064016 100%)", 
                color: "white",
                borderBottom: "4px solid #32cd60"
            }}>
                <Container className="d-flex align-items-center">
                    {/* Botón de menú */}
                    <Button variant="outline-light" className="me-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FaBars />
                    </Button>

                    {/* Logo con imagen personalizada */}
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                        <img src={logo} alt="Invernatech Logo" className="me-2" style={{
                            width: "45px",
                            height: "45px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            background: "rgba(50, 205, 96, 0.3)",
                            padding: "5px"
                        }} />
                        <h4 className="m-0 fw-bold" style={{
                            background: "linear-gradient(90deg, #32cd60, #28a745)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            INVERNATECH
                        </h4>
                    </Navbar.Brand>

                    {/* Barra de búsqueda */}
                    <Form className="d-flex mx-auto bg-light rounded px-2" style={{ flex: 1, maxWidth: "400px" }}>
                        <FormControl type="text" placeholder="Buscar..." className="border-0 shadow-none" />
                        <Button variant="light" className="border-0">
                            <FaSearch />
                        </Button>
                    </Form>

                    {/* Links de perfil, registro e inicio de sesión */}
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button as={Link} to="/perfil" variant="outline-light" className="me-2">
                            <FaUser className="me-1" /> Perfil
                        </Button>
                        <Button as={Link} to="/registro" variant="outline-light" className="me-2">
                            Registrarse
                        </Button>
                        <Button as={Link} to="/login" variant="success" className="fw-bold">
                            Iniciar sesión
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Menú lateral con animación */}
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
