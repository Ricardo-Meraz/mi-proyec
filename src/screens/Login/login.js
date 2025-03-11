import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulación de autenticación (usuario fijo)
    if (email === "invernatech@gmail.com" && password === "12345678") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100" 
      style={{ 
        backgroundImage: "url('./imgs/tierra1.jpg')", // Cambia la URL por tu imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px"
      }}
    >
      <div 
        className="card p-5 shadow-lg" 
        style={{ 
          width: '100%', 
          maxWidth: '500px', // Tarjeta más grande
          borderRadius: '15px', 
          border: 'none',
          backgroundColor: "rgba(255, 255, 255, 0.95)", // Fondo blanco semi-transparente
          backdropFilter: "blur(5px)" // Efecto de desenfoque
        }}
      >
        <h2 
          className="text-center mb-4" 
          style={{ 
            color: "#333", 
            fontWeight: "bold", 
            fontSize: "28px"
          }}
        >
          Iniciar Sesión
        </h2>
        {error && (
          <div 
            className="alert alert-danger text-center" 
            style={{ 
              borderRadius: "10px", 
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label 
              htmlFor="email" 
              className="form-label" 
              style={{ 
                color: "#555", 
                fontWeight: "500"
              }}
            >
              Correo
            </label>
            <input 
              type="email" 
              id="email"
              className="form-control"
              style={{ 
                borderRadius: "10px", 
                padding: "10px", 
                border: "1px solid #ddd"
              }}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3">
            <label 
              htmlFor="password" 
              className="form-label" 
              style={{ 
                color: "#555", 
                fontWeight: "500"
              }}
            >
              Contraseña
            </label>
            <input 
              type="password" 
              id="password"
              className="form-control"
              style={{ 
                borderRadius: "10px", 
                padding: "10px", 
                border: "1px solid #ddd"
              }}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn w-100" 
            style={{ 
              background: "#28a745", // Verde para combinar con el tema del invernadero
              color: "#fff", 
              fontWeight: "600", 
              borderRadius: "10px", 
              padding: "12px", 
              border: "none", 
              transition: "background 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.background = "#218838"}
            onMouseOut={(e) => e.target.style.background = "#28a745"}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;