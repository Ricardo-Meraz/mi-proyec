import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import VincularIoT from './VincularIoT';
import ControlIoT from './ControlIoT';
import { UserContext } from '../UserContext/UserContext';

const IoTManager = () => {
  const { user } = useContext(UserContext);
  const [isLinked, setIsLinked] = useState(null); // null: cargando, true: vinculado, false: no vinculado
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!user) return;
    // Consulta a la API para ver si existe un dispositivo vinculado
    axios
      .get(`https://servidor-bbkq.vercel.app/dispositivos/estado?email=${user.email}`)
      .then((response) => {
        // Si se obtiene un dispositivo, se considera vinculado
        setIsLinked(true);
      })
      .catch((error) => {
        // Si la respuesta es 404, no hay dispositivo vinculado
        if (error.response && error.response.status === 404) {
          setIsLinked(false);
        } else {
          setMensaje('Error al verificar dispositivo: ' + error.message);
        }
      });
  }, [user]);

  if (!user) {
    return <p>No has iniciado sesión.</p>;
  }

  if (isLinked === null) {
    return <p>Cargando...</p>;
  }

  if (mensaje) {
    return <p>{mensaje}</p>;
  }

  return <div>{isLinked ? <ControlIoT /> : <VincularIoT />}</div>;
};

export default IoTManager;
