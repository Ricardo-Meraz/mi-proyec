import React, { useEffect, useState } from 'react';

const EliminarProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch('http://localhost:5000/productos');
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProductos();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm('¿Estás seguro de eliminar este producto?');
        if (!confirmacion) return;

        try {
            const res = await fetch(`http://localhost:5000/productos/${id}`, { method: 'DELETE' });

            if (!res.ok) throw new Error('Error al eliminar producto');

            setProductos(productos.filter(producto => producto._id !== id));
            alert('Producto eliminado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al eliminar el producto');
        }
    };

    return (
        <div>
            <h2>Eliminar Productos</h2>
            <ul>
                {productos.map(producto => (
                    <li key={producto._id}>
                        {producto.nombre} - ${producto.precio}
                        <button onClick={() => handleDelete(producto._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EliminarProductos;
