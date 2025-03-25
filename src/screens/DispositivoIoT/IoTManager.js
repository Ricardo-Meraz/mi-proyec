// IoTManager.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const API_URL = 'https://servidor-bbkq.vercel.app/dispositivos/estado';

const IoTManager = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    
    axios.get(`${API_URL}?email=${user.email}`)
      .then(response => {
        if (response.data) {
          // Si el dispositivo está vinculado, redirige al dashboard.
          navigate('/iot-dashboard');
        } else {
          // Si no hay dispositivo vinculado, redirige a vincular.
          navigate('/vincular-iot');
        }
      })
      .catch(error => {
        // Si el error es 404, se asume que no hay dispositivo vinculado.
        if (error.response && error.response.status === 404) {
          navigate('/vincular-iot');
        } else {
          console.error('Error al cargar datos del dispositivo:', error);
        }
      });
  }, [user, navigate]);

  return <p>Cargando...</p>;
};

export default IoTManager;
