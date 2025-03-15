import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/cartproductos/cartproductos';
import { Container, Row, Col } from 'react-bootstrap';

const ProductosCat = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const categoriaSeleccionada = searchParams.get("categoria") || "Todos";

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const respuesta = await axios.get('https://servidor-bbkq.vercel.app/Productos'); // ✅ URL corregida
                setProductos(respuesta.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('No se pudieron cargar los productos. Intenta nuevamente.');
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const productosFiltrados = categoriaSeleccionada === 'Todos'
        ? productos
        : productos.filter(producto => producto.categoria === categoriaSeleccionada);

    if (loading) {
        return <p className="text-center">Cargando productos...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Productos</h2>
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
