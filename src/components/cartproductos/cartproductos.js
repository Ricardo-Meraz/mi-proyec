import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ image, title, description }) => {
  return (
    <Card 
      className="shadow-sm text-center h-100" 
      style={{ 
        borderRadius: "10px", 
        border: "none", 
        transition: "transform 0.2s", 
        cursor: "pointer" 
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <Card.Img 
        variant="top" 
        src={image} 
        className="p-3" 
        style={{ 
          height: "200px", 
          objectFit: "cover", 
          borderTopLeftRadius: "10px", 
          borderTopRightRadius: "10px" 
        }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          {title}
        </Card.Title>
        <Card.Text style={{ fontSize: "14px", color: "#555", flexGrow: 1 }}>
          {description}
        </Card.Text>
        <Button 
          variant="primary" 
          style={{ 
            borderRadius: "20px", 
            padding: "8px 20px", 
            fontSize: "14px", 
            fontWeight: "500", 
            marginTop: "auto" 
          }}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;