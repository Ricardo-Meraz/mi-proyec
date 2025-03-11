import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./cartproductos";
import { Container } from "react-bootstrap";

const ProductList = () => {
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para el cargando

  // Usar useEffect para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    // Hacer la solicitud GET a la API
    axios.get("http://localhost:5000/productos") // Ajusta la URL si es necesario
      .then((response) => {
        setProductos(response.data); // Almacenar los productos en el estado
        setLoading(false); // Cambiar el estado de loading
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false); // Si hay error, también cambiar el estado de loading
      });
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <Container className="mt-4 text-center">
      <h2 className="fw-bold">Bienvenido a InvernaTech</h2>
      <p className="text-muted">Explora nuestros productos</p>
      {Array.from({ length: Math.ceil(productos.length / 8) }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "10px" }}>
          {productos.slice(rowIndex * 8, rowIndex * 8 + 8).map((producto, index) => (
            <div key={index} style={{ flex: "0 0 auto", width: "250px", marginRight: "10px" }}>
              <ProductCard 
                image={producto.imagenUrl} 
                title={producto.nombre} 
                description={producto.descripcion} 
              />
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default ProductList;
