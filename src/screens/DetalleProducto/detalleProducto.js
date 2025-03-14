import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Card, Breadcrumb } from "react-bootstrap";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/productos/${id}`)
      .then((response) => {
        setProducto(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <Container className="mt-4">
      {/* Migas de Pan */}
      <Breadcrumb>  
        <Breadcrumb.Item as={Link} to="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item as={Link} to="/ProductosCat">
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item as={Link} to={`/ProductosCat?categoria=${producto.categoria}`}>
          {producto.categoria}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow-lg p-3">
        <Card.Img 
          variant="top" 
          src={producto.imagenUrl} 
          style={{
            maxHeight: "400px",
            width: "100%",
            objectFit: "contain",
          }}
        />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            <strong>Descripción:</strong> {producto.descripcion}
          </Card.Text>
          <Card.Text>
            <strong>Categoría:</strong> {producto.categoria}
          </Card.Text>
          <Card.Text>
            <strong>Precio:</strong> ${producto.precio}
          </Card.Text>
          <Card.Text>
            <strong>Stock disponible:</strong> {producto.stock}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
