import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const API_URL = "https://servidor-bbkq.vercel.app/dispositivos";

const VincularIoT = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [ip, setIp] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!user) return;
    
    axios.get(`${API_URL}/estado?email=${user.email}`)
      .then(response => {
        if (response.data) {
          // Si ya hay dispositivo vinculado, redirige al dashboard.
          navigate('/iot-dashboard');
        }
      })
      .catch(error => {
        if (error.response && error.response.status !== 404) {
          setMensaje('Error al verificar el dispositivo');
        }
      });
  }, [user, navigate]);

  const handleVincular = async () => {
    if (!nombre || !ip) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/vincular`, {
        nombre,
        ip,
        email: user.email,
      });
      
      if (response.status === 200) {
        navigate('/iot-dashboard');
      } else {
        setMensaje(response.data.mensaje || 'Error al vincular dispositivo');
      }
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al conectar con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Vincular Dispositivo IoT</h2>
        <input
          type="text"
          placeholder="Nombre del dispositivo"
          style={styles.input}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección IP"
          style={styles.input}
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        {mensaje && <p style={styles.error}>{mensaje}</p>}
        <button
          onClick={handleVincular}
          style={styles.button}
        >
          Vincular
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #006400, #228B22, #32CD32)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: '#228B22',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  }
};

export default VincularIoT;
