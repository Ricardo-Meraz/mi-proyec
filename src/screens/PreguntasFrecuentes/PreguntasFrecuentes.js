import React from "react";
import { Container, Accordion } from "react-bootstrap";

const PreguntasFrecuentes = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>¿Cómo puedo realizar una compra?</Accordion.Header>
          <Accordion.Body>
            Puedes realizar una compra seleccionando los productos y agregándolos al carrito. Luego, sigue las instrucciones para el pago y envío.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>¿Cuáles son los métodos de pago aceptados?</Accordion.Header>
          <Accordion.Body>
            Aceptamos pagos con tarjeta de crédito, débito y transferencias bancarias.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>¿Ofrecen envíos a todo el país?</Accordion.Header>
          <Accordion.Body>
            Sí, realizamos envíos a nivel nacional con diferentes opciones de entrega.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>¿Cuánto tiempo tarda el envío?</Accordion.Header>
          <Accordion.Body>
            El tiempo de entrega varía entre 2 a 5 días hábiles, dependiendo de la ubicación.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>¿Puedo cancelar mi pedido?</Accordion.Header>
          <Accordion.Body>
            Sí, puedes cancelar tu pedido antes de que haya sido enviado. Contáctanos lo antes posible.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>¿Cómo puedo hacer una devolución?</Accordion.Header>
          <Accordion.Body>
            Puedes solicitar una devolución dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>¿Los productos tienen garantía?</Accordion.Header>
          <Accordion.Body>
            Sí, ofrecemos garantía en todos nuestros productos. La duración varía según el producto.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>¿Cómo puedo rastrear mi pedido?</Accordion.Header>
          <Accordion.Body>
            Una vez enviado tu pedido, recibirás un número de seguimiento para rastrearlo en tiempo real.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>¿Puedo comprar al por mayor?</Accordion.Header>
          <Accordion.Body>
            Sí, ofrecemos precios especiales para compras al por mayor. Contáctanos para más información.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>¿Cómo puedo contactar al servicio de atención al cliente?</Accordion.Header>
          <Accordion.Body>
            Puedes contactarnos por correo electrónico, teléfono o WhatsApp. Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default PreguntasFrecuentes;
