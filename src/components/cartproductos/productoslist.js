import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./cartproductos";
import { Container } from "react-bootstrap";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://servidor-bbkq.vercel.app/Productos") // ✅ URL de la API
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
      <p className="text-muted fs-5">Explora nuestros productos</p>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "15px",
          paddingBottom: "15px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none", // Oculta scrollbar en Firefox
          msOverflowStyle: "none", // Oculta scrollbar en IE/Edge
        }}
      >
        {/* Oculta scrollbar en Chrome y Safari */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {productos.map((producto) => (
          <div
            key={producto._id}
            style={{
              flex: "0 0 auto",
              width: "260px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "white",
              padding: "10px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
