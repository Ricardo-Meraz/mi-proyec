import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./cartproductos";
import { Container } from "react-bootstrap";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://servidor-bbkq.vercel.app/Productos")  // ✅ URL de la API
      .then((response) => {
        console.log("Productos recibidos:", response.data);
        setProductos(response.data.slice(0, 8)); // Limita a 8 productos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setError("No se pudieron cargar los productos.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (productos.length === 0) {
    return <p className="text-center">No hay productos disponibles.</p>;
  }

  return (
    <Container className="mt-4 text-center">
      <p className="text-muted">Explora nuestros productos</p>
      <div 
        style={{
          display: "flex",
          overflowX: "auto",  // 📌 Permite desplazamiento horizontal
          whiteSpace: "nowrap",  // 📌 Evita que los productos bajen de línea
          gap: "10px", // 📌 Espaciado entre productos
          paddingBottom: "10px",
          scrollSnapType: "x mandatory"  // 📌 Hace que el scroll sea más suave
        }}
      >
        {productos.map((producto) => (
          <div key={producto._id} style={{ flex: "0 0 auto", width: "250px" }}> {/* 📌 Tarjetas en una sola línea */}
            <ProductCard 
              id={producto._id} 
              image={producto.imagenUrl} 
              title={producto.nombre} 
              description={`Precio: $${producto.precio}`} 
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
