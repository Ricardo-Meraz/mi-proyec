// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Foother/Foother";
import ProductList from "./components/cartproductos/productoslist";
import Login from "./screens/Login/login";
import QuienesSomos from "./screens/AcercaDe/quienes-somos";
import Contacto from "./screens/Contacto/Contactos";
import Registro from "./screens/Registro/Registro";
import PreguntasFrecuentes from "./screens/PreguntasFrecuentes/PreguntasFrecuentes";
import Politicas from "./screens/Politicas/Politicas";
import CloudinaryUpload from "./components/cloudinary/cloudinary"; 

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/Contactos" element={<Contacto />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/upload" element={<CloudinaryUpload />} /> {/* Nueva ruta para cargar imagenes */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
