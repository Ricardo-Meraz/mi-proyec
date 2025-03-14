import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/cartproductos/cartproductos';
import { Container, Row, Col, Button } from 'react-bootstrap';

const categorias = ['Todos', 'Invernaderos', 'Herramientas', 'Fertilizantes', 'Sustratos'];

const ProductosCat = () => {
    const [productos, setProductos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoriaSeleccionada = searchParams.get("categoria") || "Todos";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:5000/productos');
                setProductos(respuesta.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProductos();
    }, []);

    const productosFiltrados = categoriaSeleccionada === 'Todos'
        ? productos
        : productos.filter(producto => producto.categoria === categoriaSeleccionada);

    return (
        <Container>
            <h2 className="text-center my-4">Productos</h2>
            <div className="d-flex justify-content-center mb-4">
                {categorias.map((cat) => (
                    <Button 
                        key={cat} 
                        onClick={() => setSearchParams({ categoria: cat })}
                        variant={categoriaSeleccionada === cat ? 'primary' : 'outline-primary'}
                        className="mx-2"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
            <Row>
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <Col key={producto._id} md={4} className="mb-4">
                            <ProductCard 
                                id={producto._id}
                                image={producto.imagenUrl} 
                                title={producto.nombre} 
                                description={producto.descripcion}
                                Precio={producto.precio}
                                Stock={producto.stock}   
                            />
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No hay productos en esta categoría.</p>
                )}
            </Row>
        </Container>
    );
};

export default ProductosCat;
