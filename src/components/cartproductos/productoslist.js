import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./cartproductos";
import { Container } from "react-bootstrap";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/productos")
      .then((response) => {
        console.log("Productos recibidos:", response.data); // Verifica los datos
        setProductos(response.data.slice(0, 8));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <Container className="mt-4 text-center">
      <p className="text-muted">Explora nuestros productos</p>
      <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "10px" }}>
        {productos.map((producto) => (
          <div key={producto._id} style={{ flex: "0 0 auto", width: "250px", marginRight: "10px" }}>
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
