import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaBoxOpen, FaSignOutAlt, FaCogs } from "react-icons/fa";
import Sidebar from "../Menu/Menu";
import logo from "./logo.jpg";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Para manejar redirecciones

    // Categorías de productos
    const categorias = ["Todos", "Invernaderos", "Herramientas", "Fertilizantes", "Sustratos"];

    // Cargar usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        // Escuchar cambios en localStorage
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Elimina el usuario de localStorage
        setUser(null); // Actualiza el estado para ocultar el nombre
        window.location.href = "/login"; // Redirige al login
    };

    // Maneja la selección de una categoría
    const handleSelectCategoria = (categoria) => {
        if (categoria === "Todos") {
            navigate("/ProductosCat"); // Si es "Todos", va a la página general de productos
        } else {
            navigate(`/ProductosCat?categoria=${encodeURIComponent(categoria)}`);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="py-3" style={{
                background: "linear-gradient(135deg, #043200 0%, #0b4a1b 50%, #064016 100%)", 
                color: "white",
                borderBottom: "4px solid #32cd60"
            }}>
                <Container className="d-flex align-items-center">
                    <Button variant="outline-light" className="me-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FaBars />
                    </Button>

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

                    <Nav className="ms-auto d-flex align-items-center">
                        {/* ✅ Botón de Productos convertido en un menú desplegable */}
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" className="me-2">
                                <FaBoxOpen className="me-1" /> Productos
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {categorias.map((categoria) => (
                                    <Dropdown.Item key={categoria} onClick={() => handleSelectCategoria(categoria)}>
                                        {categoria}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* ✅ Agregar menú Administrar si el usuario es Admin */}
                        {user?.rol === "Admin" && (
                            <Dropdown className="me-3">
                                <Dropdown.Toggle variant="outline-light">
                                    <FaCogs className="me-1" /> Administrar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin/usuarios">Administrar Usuarios</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/quienes-somos">Administrar Quiénes Somos</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/editar-productos">Administrar Productos</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/politicas">Administrar Políticas</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                        {user ? (
                            <>
                                <span className="text-white fw-bold me-3">
                                    Bienvenido, {user.nombre}
                                </span>
                                <Button variant="danger" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-1" /> Cerrar sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button as={Link} to="/registro" variant="outline-light" className="me-2">
                                    Registrarse
                                </Button>
                                <Button as={Link} to="/login" variant="success" className="fw-bold">
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
