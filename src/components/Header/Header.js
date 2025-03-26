import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaBoxOpen, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import Sidebar from "../Menu/Menu";
import logo from "./logo.jpg";
import { UserContext } from "../../screens/UserContext/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasDispositivo, setHasDispositivo] = useState(false);

  const categorias = ["Todos", "Invernaderos", "Herramientas", "Fertilizantes", "Sustratos"];

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleSelectCategoria = (categoria) => {
    if (categoria === "Todos") {
      navigate("/ProductosCat");
    } else {
      navigate(`/ProductosCat?categoria=${encodeURIComponent(categoria)}`);
    }
  };

  useEffect(() => {
    const verificarDispositivo = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(`https://servidor-bbkq.vercel.app/dispositivos/estado?email=${user.email}`);
        if (response.data) {
          setHasDispositivo(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setHasDispositivo(false);
        } else {
          console.error("Error al verificar dispositivo IoT:", error);
        }
      }
    };

    verificarDispositivo();
  }, [user]);

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
          <Button
            variant="outline-light"
            className="me-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </Button>

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

          <Nav className="ms-auto d-flex align-items-center">
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

            {user?.rol === "Admin" && (
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="outline-light">
                  <FaCogs className="me-1" /> Administrar
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin-usuarios">Administrar Usuarios</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/quienes-somos">Administrar Quiénes Somos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/editar-productos">Administrar Productos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin-politicas">Administrar Políticas</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin-contactanos">Administrar Contactanos</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin-faqs">Administrar FAQ</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {user ? (
              <>
                <span className="text-white fw-bold me-3">
                  Bienvenido, {user.nombre}
                </span>

                {/* ✅ Mostrar solo si tiene un dispositivo IoT */}
                {hasDispositivo && (
                  <Button
                    variant="success"
                    onClick={() => navigate("/iot-dashboard")}
                    className="me-3"
                  >
                    <FaComputer className="me-1" /> Control IoT
                  </Button>
                )}

                <Button
                  variant="outline-light"
                  as={Link}
                  to="/perfil"
                  className="me-3"
                >
                  <FaUser className="me-1" /> Perfil
                </Button>

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

      {/* Sidebar */}
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
