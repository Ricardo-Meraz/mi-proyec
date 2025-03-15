import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="shadow-sm text-center"
      style={{ 
        width: "300px",  
        borderRadius: "12px", 
        border: "none", 
        transition: "transform 0.2s ease-in-out", 
        cursor: "pointer",
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ height: "160px", overflow: "hidden", padding: "5px" }}>
        <Card.Img 
          variant="top" 
          src={image} 
          alt={title}
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "contain"
          }} 
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="fs-6">{title}</Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
          {description}
        </Card.Text>
        <Button 
          variant="success"
          size="sm"
          onClick={() => navigate(`/producto/${id}`)}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
