// Header.js
import React, { useContext } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaBoxOpen, FaSignOutAlt, FaCogs } from "react-icons/fa";
import Sidebar from "../Menu/Menu";
import logo from "./logo.jpg";
import { UserContext } from "../../screens/UserContext/UserContext";  // Ajusta la ruta si difiere
import { FaComputer } from "react-icons/fa6";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Categorías de productos (ejemplo)
    const categorias = ["Todos", "Invernaderos", "Herramientas", "Fertilizantes", "Sustratos"];

    const handleLogout = () => {
        setUser(null);  // Limpia el usuario del contexto
        navigate("/login");
    };

    // Maneja la selección de una categoría
    const handleSelectCategoria = (categoria) => {
        if (categoria === "Todos") {
            navigate("/ProductosCat");
        } else {
            navigate(`/ProductosCat?categoria=${encodeURIComponent(categoria)}`);
        }
    };

    return (
        <>
            <Navbar
                expand="lg"
                className="py-3"
                style={{
                    background: "linear-gradient(135deg, #043200 0%, #0b4a1b 50%, #064016 100%)", 
                    color: "white",
                    borderBottom: "4px solid #32cd60",
                }}
            >
                <Container className="d-flex align-items-center">
                    {/* Botón para abrir/cerrar el Sidebar */}
                    <Button
                        variant="outline-light"
                        className="me-3"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaBars />
                    </Button>

                    {/* Logo y nombre de la app */}
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                        <img
                            src={logo}
                            alt="Invernatech Logo"
                            className="me-2"
                            style={{
                                width: "45px",
                                height: "45px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                background: "rgba(50, 205, 96, 0.3)",
                                padding: "5px",
                            }}
                        />
                        <h4
                            className="m-0 fw-bold"
                            style={{
                                background: "linear-gradient(90deg, #32cd60, #28a745)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            INVERNATECH
                        </h4>
                    </Navbar.Brand>

                    {/* Menú de navegación a la derecha */}
                    <Nav className="ms-auto d-flex align-items-center">
                        {/* Dropdown de categorías de productos */}
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" className="me-2">
                                <FaBoxOpen className="me-1" /> Productos
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {categorias.map((categoria) => (
                                    <Dropdown.Item
                                        key={categoria}
                                        onClick={() => handleSelectCategoria(categoria)}
                                    >
                                        {categoria}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Opciones de administración: solo si el usuario es Admin */}
                        {user?.rol === "Admin" && (
                            <Dropdown className="me-3">
                                <Dropdown.Toggle variant="outline-light">
                                    <FaCogs className="me-1" /> Administrar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/admin-usuarios">
                                        Administrar Usuarios
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin/quienes-somos">
                                        Administrar Quiénes Somos
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/editar-productos">
                                        Administrar Productos
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/admin-politicas">
                                        Administrar Políticas
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

                        {/* Botones condicionales según si el usuario está logeado o no */}
                        {user ? (
                            <>
                                <span className="text-white fw-bold me-3">
                                    Bienvenido, {user.nombre}
                                </span>
                                <Button
                                    variant="success"
                                    onClick={() => navigate("/iot-dashboard")}
                                    className="me-3">
                                    <FaComputer className="me-1" /> Control IoT
                                </Button>

                                {/* Botón de perfil con ícono, visible si user está logeado */}
                                <Button
                                    variant="outline-light"
                                    as={Link}
                                    to="/perfil" // Ajusta la ruta si la tuya es distinta
                                    className="me-3"
                                >
                                    <FaUser className="me-1" /> Perfil
                                </Button>

                                {/* Botón para cerrar sesión */}
                                <Button variant="danger" onClick={handleLogout}>
                                    <FaSignOutAlt className="me-1" /> Cerrar sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Si no hay usuario, mostrar botones de Registro y Login */}
                                <Button
                                    as={Link}
                                    to="/registro"
                                    variant="outline-light"
                                    className="me-2"
                                >
                                    Registrarse
                                </Button>
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="success"
                                    className="fw-bold"
                                >
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            {/* Sidebar lateral */}
            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
