import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../screens/UserContext/UserContext"; // Ajusta la ruta según tu estructura

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://servidor-bbkq.vercel.app/usuarios/login", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
          // Actualizamos el contexto con el usuario
          setUser(data.usuario);
          // Opcional: guardar en localStorage para persistencia
          localStorage.setItem("user", JSON.stringify(data.usuario));
          navigate("/");
      } else {
          setError(data.mensaje || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor. Intenta nuevamente.");
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100" 
      style={{ backgroundImage: "url('./imgs/tierra1.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: "20px" }}
    >
      <div 
        className="card p-5 shadow-lg" 
        style={{ width: '100%', maxWidth: '500px', borderRadius: '15px', border: 'none', backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(5px)" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold", fontSize: "28px" }}>Iniciar Sesión</h2>
        {error && <div className="alert alert-danger text-center" style={{ borderRadius: "10px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: "#555", fontWeight: "500" }}>Correo</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: "#555", fontWeight: "500" }}>Contraseña</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Ingresar</button>
        </form>
        <div className="text-center mt-3">
          <button 
            className="btn btn-link text-decoration-none" 
            style={{ color: "#007bff", fontWeight: "500" }} 
            onClick={() => navigate("/recuperar-contraseña")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
