import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Foother/Foother";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/login";
import QuienesSomos from "./screens/AcercaDe/quienes-somos";
import Contacto from "./screens/Contacto/Contactos";
import Registro from "./screens/Registro/Registro";
import PreguntasFrecuentes from "./screens/PreguntasFrecuentes/PreguntasFrecuentes";
import Politicas from "./screens/Politicas/Politicas";
import CloudinaryUpload from "./components/cloudinary/cloudinary";
import ProductosCat from "./screens/TiendaProductos/ProductosCat";
import DetalleProducto from "./screens/DetalleProducto/detalleProducto";
import EditProductos from "./screens/AdminProductos/EditProductos";
import HistoriaAntecedentes from "./screens/Historia-Antecedentes/Historia-Antecedentes"; // ✅ Nueva importación

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contactos" element={<Contacto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/upload" element={<CloudinaryUpload />} />
        <Route path="/ProductosCat" element={<ProductosCat />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/editar-productos" element={<EditProductos />} />
        <Route path="/historia-antecedentes" element={<HistoriaAntecedentes />} /> {/* ✅ Nueva ruta */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
