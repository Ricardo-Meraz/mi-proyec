import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AggProductos = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [categoria, setCategoria] = useState('Invernaderos');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !precio.trim() ||
      !stock.trim() ||
      !imagenUrl.trim() ||
      !categoria.trim()
    ) {
      setMensaje('Todos los campos son obligatorios y deben tener contenido válido');
      return;
    }

    const precioFloat = parseFloat(precio);
    const stockInt = parseInt(stock, 10);

    if (isNaN(precioFloat) || precioFloat < 0) {
      setMensaje('El precio no puede ser negativo');
      return;
    }

    if (isNaN(stockInt) || stockInt < 0) {
      setMensaje('El stock no puede ser negativo');
      return;
    }

    const nuevoProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioFloat,
      stock: stockInt,
      imagenUrl: imagenUrl.trim(),
      categoria
    };

    try {
      const response = await axios.post(
        'https://servidor-bbkq.vercel.app/productos',
        nuevoProducto
      );
      if (response.status === 201) {
        setMensaje('Producto agregado exitosamente');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setImagenUrl('');
        setCategoria('Invernaderos');
        navigate('/ProductosCat');
      } else {
        setMensaje('Error al agregar producto');
      }
    } catch (error) {
      setMensaje('Error al agregar producto: ' + error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow p-4">
        <h4 className="text-center mb-4">Agregar Producto</h4>
        {mensaje && <Alert variant="info">{mensaje}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="descripcion" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="precio" className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder="Ingrese el precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="stock" className="mb-3">
            <Form.Label>Stock disponible</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder="Ingrese el stock disponible"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="imagenUrl" className="mb-3">
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="categoria" className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Invernaderos">Invernaderos</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Fertilizantes">Fertilizantes</option>
              <option value="Sustratos">Sustratos</option>
            </Form.Control>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Agregar Producto
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AggProductos;
