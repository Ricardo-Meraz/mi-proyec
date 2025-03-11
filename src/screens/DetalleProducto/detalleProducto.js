import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Image } from "react-bootstrap";

const ProductDetail = ({ image, title, description }) => {
  return (
    <Container className="text-center mt-4">
      <Image src={image} fluid className="rounded mb-3" style={{ maxHeight: "300px" }} />
      <h1>{title}</h1>
      <p className="text-muted">{description}</p>
    </Container>
  );
};

export default ProductDetail;
