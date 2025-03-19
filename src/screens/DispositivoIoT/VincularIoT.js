import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const API_URL = "https://servidor-bbkq.vercel.app/dispositivos/vincular";

const VincularIoT = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [mac, setMac] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleVincular = async () => {
    if (!nombre || !mac) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si usas autenticación con token, inclúyelo:
          Authorization: `Bearer ${user.token}`,
        },
        // Se envía también el email del usuario (único)
        body: JSON.stringify({ nombre, mac, email: user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Una vez vinculado, redirige a la vista de control
        navigate('/control-iot');
      } else {
        setMensaje(data.mensaje);
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Vincular Dispositivo IoT</h2>
        <input
          type="text"
          placeholder="Nombre del dispositivo"
          className="w-full p-2 mb-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección MAC"
          className="w-full p-2 mb-2 border rounded"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
        />
        {mensaje && <p className="text-red-500 text-sm mb-2">{mensaje}</p>}
        <button
          onClick={handleVincular}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Vincular
        </button>
      </div>
    </div>
  );
};

export default VincularIoT;
