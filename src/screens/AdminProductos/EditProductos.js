import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container, Pagination } from "react-bootstrap";

const EditProductos = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 7;

  const navigate = useNavigate();
  const API_URL = "https://servidor-bbkq.vercel.app/productos";

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
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
        await axios.delete(`${API_URL}/${id}`);
        alert("Producto eliminado correctamente");
        obtenerProductos();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const agregarProducto = () => {
    navigate("/agg-productos");
  };

  // 🔄 Cálculos para paginación
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);
  const irAPrimera = () => setPaginaActual(1);
  const irAUltima = () => setPaginaActual(totalPaginas);
  const anterior = () =>
    setPaginaActual((prev) => (prev > 1 ? prev - 1 : prev));
  const siguiente = () =>
    setPaginaActual((prev) => (prev < totalPaginas ? prev + 1 : prev));

  return (
    <Container className="mt-4">
      <h2 className="text-center text-success mb-4">Administrar Productos</h2>

      <Button variant="success" className="mb-3" onClick={agregarProducto}>
        + Agregar Producto
      </Button>

      <Table striped bordered hover responsive className="shadow-lg mb-4">
        <thead className="bg-success text-white text-center">
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosActuales.length > 0 ? (
            productosActuales.map((producto) => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => editarProducto(producto._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Paginación bonita */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={irAPrimera} disabled={paginaActual === 1} />
            <Pagination.Prev onClick={anterior} disabled={paginaActual === 1} />
            {[...Array(totalPaginas).keys()].map((num) => (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === paginaActual}
                onClick={() => cambiarPagina(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={siguiente}
              disabled={paginaActual === totalPaginas}
            />
            <Pagination.Last
              onClick={irAUltima}
              disabled={paginaActual === totalPaginas}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default EditProductos;
