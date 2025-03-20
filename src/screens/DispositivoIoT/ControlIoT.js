import React, { useEffect, useState } from 'react';

// Cambia la IP a la del ESP32 y puerto 8080
const WEBSOCKET_URL = 'ws://192.168.252.128:8080';

const ControlIoT = () => {
  const [ws, setWs] = useState(null);
  const [mensaje, setMensaje] = useState('');
  
  // Estados para los actuadores y modo
  const [foco, setFoco] = useState(false);
  const [ventilador, setVentilador] = useState(false);
  const [bomba, setBomba] = useState(false);
  const [modoAuto, setModoAuto] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('Conectado al ESP32 vía WebSocket');
    };

    socket.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
      setMensaje(event.data);
      // Aquí podrías parsear si el ESP32 envía datos en JSON
    };

    socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setMensaje('Error en conexión WebSocket');
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const enviarComando = (comando) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(comando);
    } else {
      setMensaje('WebSocket no está conectado');
    }
  };

  const toggleFoco = () => {
    const nuevoEstado = !foco;
    setFoco(nuevoEstado);
    enviarComando(nuevoEstado ? 'foco_on' : 'foco_off');
  };

  const toggleVentilador = () => {
    const nuevoEstado = !ventilador;
    setVentilador(nuevoEstado);
    enviarComando(nuevoEstado ? 'ventilador_on' : 'ventilador_off');
  };

  const toggleBomba = () => {
    const nuevoEstado = !bomba;
    setBomba(nuevoEstado);
    enviarComando(nuevoEstado ? 'bomba_on' : 'bomba_off');
  };

  const toggleModo = () => {
    const nuevoModo = !modoAuto;
    setModoAuto(nuevoModo);
    enviarComando(nuevoModo ? 'modo_auto' : 'modo_manual');
  };

  // Estilos CSS inline
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f9',
      padding: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '600px',
      boxSizing: 'border-box',
    },
    heading: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    widget: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    widgetTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    widgetState: {
      fontSize: '16px',
      marginBottom: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    message: {
      color: 'red',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Control del Dispositivo IoT</h2>
        <p style={styles.message}>{mensaje}</p>
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Modo de Operación</h3>
          <p style={styles.widgetState}>Estado: {modoAuto ? 'Automático' : 'Manual'}</p>
          <button style={styles.button} onClick={toggleModo}>Cambiar</button>
        </div>
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Ventilador</h3>
          <p style={styles.widgetState}>Estado: {ventilador ? 'Encendido' : 'Apagado'}</p>
          <button style={styles.button} onClick={toggleVentilador}>Cambiar</button>
        </div>
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Bomba</h3>
          <p style={styles.widgetState}>Estado: {bomba ? 'Encendida' : 'Apagada'}</p>
          <button style={styles.button} onClick={toggleBomba}>Cambiar</button>
        </div>
        <div style={styles.widget}>
          <h3 style={styles.widgetTitle}>Foco</h3>
          <p style={styles.widgetState}>Estado: {foco ? 'Encendido' : 'Apagado'}</p>
          <button style={styles.button} onClick={toggleFoco}>Cambiar</button>
        </div>
      </div>
    </div>
  );
};

export default ControlIoT;
