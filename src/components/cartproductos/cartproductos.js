import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="shadow-sm text-center h-100" 
      style={{ borderRadius: "10px", border: "none", transition: "transform 0.2s", cursor: "pointer" }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <Card.Img 
        variant="top" 
        src={image} 
        className="p-3" 
        style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button 
          variant="primary"
          onClick={() => {
            console.log("Redirigiendo a producto:", id); // Verifica si el ID está bien
            navigate(`/producto/${id}`);
          }}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
