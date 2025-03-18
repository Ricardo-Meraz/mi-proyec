import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSeedling } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-4" style={{
            background: "linear-gradient(135deg, #052300 0%, #0a5020 50%, #063d10 100%)",
            color: "white",
            borderTop: "4px solid #2ecc71"
        }}>
            <Container>
                <Row className="text-center mb-3">
                    <Col>
                        <Link to="/" className="text-decoration-none d-inline-flex align-items-center">
                            <div className="d-flex align-items-center justify-content-center rounded-circle me-2" style={{
                                width: "50px",
                                height: "50px",
                                background: "rgba(46, 204, 113, 0.3)"
                            }}>
                                <FaSeedling size={24} color="#2ecc71" />
                            </div>
                            <h2 className="m-0 fw-bold" style={{
                                background: "linear-gradient(90deg, #2ecc71, #27ae60)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                INVERNATECH
                            </h2>
                        </Link>
                        <p className="mt-2" style={{ fontSize: "14px", color: "#a8e6bc" }}>
                            Innovación y tecnología para la agricultura sostenible.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="text-center mb-3">
                        <h6 className="fw-bold">Quiénes Somos</h6>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li><Link to="/quienes-somos" className="text-light text-decoration-none">Misión y Visión</Link></li>
                            <li><Link to="/Historia-Antecedentes" className="text-light text-decoration-none">Historia y Antecedentes</Link></li>
                            <li><Link to="/Politicas" className="text-light text-decoration-none">Politicas</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center mb-3">
                        <h6 className="fw-bold">Contacto</h6>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li><Link to="/Contactos" className="text-light text-decoration-none">Contactanos</Link></li>
                            <li><Link to="/preguntas-frecuentes" className="text-light text-decoration-none">Preguntas Frecuentes</Link></li>
                            <li><Link to="/ubicacion" className="text-light text-decoration-none">Ubicacion</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <h6 className="fw-bold">Síguenos</h6>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;