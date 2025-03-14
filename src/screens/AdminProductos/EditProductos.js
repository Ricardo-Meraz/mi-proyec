import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";

const EditProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const editarProducto = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:5000/productos/${id}`);
        alert("Producto eliminado correctamente");
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Editar y Eliminar Productos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>
                <Button variant="warning" onClick={() => editarProducto(producto._id)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => eliminarProducto(producto._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EditProductos;
