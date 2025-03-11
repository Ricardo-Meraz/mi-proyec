import React from "react";
import ProductCard from "./cartproductos";
import { Container, Row, Col } from "react-bootstrap";

const ProductList = () => {
  const products = [
    { image: "./imgs/invernadero.jpg", title: "Invernadero Inteligente", description: "Breve descripción." },
    { image: "./imgs/Guantes.jpg", title: "Guantes", description: "Breve descripción." },
    { image: "./imgs/tela.jpg", title: "Malla protectora", description: "Breve descripción." },
    { image: "./imgs/macetas.jpg", title: "Macetas", description: "Breve descripción." },
    { image: "./imgs/riego.jpg", title: "Sistema de Riego", description: "Breve descripción." },
    { image: "./imgs/abono.jpg", title: "Abono Orgánico", description: "Breve descripción." },
    { image: "./imgs/semillas.jpg", title: "Semillas de Hortalizas", description: "Breve descripción." },
    { image: "./imgs/fertilizante.jpg", title: "Fertilizante Líquido", description: "Breve descripción." },
    { image: "./imgs/sustrato.jpg", title: "Sustrato para Cultivo", description: "Breve descripción." },
    { image: "./imgs/luces.jpg", title: "Luces LED para Cultivo", description: "Breve descripción." },
    { image: "./imgs/controlador.jpg", title: "Controlador de Temperatura", description: "Breve descripción." },
    { image: "./imgs/herramientas.jpg", title: "Kit de Herramientas", description: "Breve descripción." },
    { image: "./imgs/ventilador.jpg", title: "Ventilador para Invernadero", description: "Breve descripción." },
    { image: "./imgs/sensor.jpg", title: "Sensor de Humedad", description: "Breve descripción." },
    { image: "./imgs/cobertor.jpg", title: "Cobertor de Invernadero", description: "Breve descripción." },
    { image: "./imgs/termometro.jpg", title: "Termómetro Digital", description: "Breve descripción." },
    { image: "./imgs/ventana.jpg", title: "Ventana Automática", description: "Breve descripción." },
    { image: "./imgs/humedad.jpg", title: "Controlador de Humedad", description: "Breve descripción." },
    { image: "./imgs/calefaccion.jpg", title: "Sistema de Calefacción", description: "Breve descripción." },
    { image: "./imgs/hidrop.jpg", title: "Sistema Hidropónico", description: "Breve descripción." },
    { image: "./imgs/aspersor.jpg", title: "Aspersor Automático", description: "Breve descripción." },
    { image: "./imgs/sensorph.jpg", title: "Sensor de pH", description: "Breve descripción." },
    { image: "./imgs/tanques.jpg", title: "Tanques de Almacenamiento", description: "Breve descripción." }
  ];

  return (
    <Container className="mt-4 text-center">
      <h2 className="fw-bold">Bienvenido a InvernaTech</h2>
      <p className="text-muted">Explora nuestros productos</p>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "10px" }}>
          {products.slice(rowIndex * 8, rowIndex * 8 + 8).map((product, index) => (
            <div key={index} style={{ flex: "0 0 auto", width: "250px", marginRight: "10px" }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default ProductList;
