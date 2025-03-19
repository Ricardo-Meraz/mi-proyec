import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import humedadImg from './humedad.png';
import luzImg from './luz.png';
import temperaturaImg from './temperatura.png';

const ControlIoT = () => {
  const { user } = useContext(UserContext);

  // Llamamos a los hooks incondicionalmente.
  // Si user es null, usamos un valor vacío para email.
  const [dispositivo, setDispositivo] = useState({
    nombre: 'Dispositivo IoT',
    temperatura: 0,
    humedad: 0,
    luz: 0,
    automatico: false,
    ventilador: false,
    bomba: false,
    foco: false,
    email: user ? user.email : ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Solo ejecuta la petición si existe user
    if (!user) return;
    axios
      .get(`https://servidor-bbkq.vercel.app/dispositivos/estado?email=${user.email}`)
      .then((response) => {
        setDispositivo(response.data);
      })
      .catch((error) => {
        setMensaje('Error al cargar dispositivo: ' + error.message);
      });
  }, [user]);

  const actualizarEstado = (campo, valor) => {
    if (!user) return;
    const updateData = { email: user.email };
    updateData[campo] = valor;

    axios
      .put('https://servidor-bbkq.vercel.app/dispositivos/actualizar', updateData)
      .then((response) => {
        setDispositivo(response.data.dispositivo);
        setMensaje(response.data.mensaje);
      })
      .catch((error) => {
        setMensaje('Error al actualizar: ' + error.message);
      });
  };

  // Si no hay usuario, renderizamos un mensaje.
  if (!user) {
    return <p>No has iniciado sesión.</p>;
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f3f3',
      padding: '16px',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '600px',
      boxSizing: 'border-box'
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '24px',
      textAlign: 'center'
    },
    deviceInfo: {
      marginBottom: '24px',
      fontSize: '16px'
    },
    label: {
      fontWeight: '600'
    },
    sensorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    sensorItem: {
      backgroundColor: '#f8f8f8',
      borderRadius: '4px',
      padding: '8px',
      textAlign: 'center'
    },
    sensorImageContainer: {
      textAlign: 'center',
      marginBottom: '8px'
    },
    sensorImage: {
      width: '80px',
      height: '80px',
      objectFit: 'contain'
    },
    sensorInfoContainer: {
      textAlign: 'center'
    },
    sensorTitle: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '4px'
    },
    sensorValue: {
      fontSize: '16px',
      fontWeight: 'bold'
    },
    widgetsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    widgetCard: {
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    widgetTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    widgetState: {
      marginBottom: '8px',
      fontSize: '14px'
    },
    widgetButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px'
    },
    message: {
      marginTop: '16px',
      color: 'red',
      fontSize: '14px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Control del Dispositivo IoT</h2>
        <div style={styles.deviceInfo}>
          <p>
            <span style={styles.label}>Nombre: </span>
            {dispositivo.nombre}
          </p>
        </div>
        <div style={styles.sensorGrid}>
          <div style={styles.sensorItem}>
            <div style={styles.sensorImageContainer}>
              <img src={temperaturaImg} alt="Temperatura" style={styles.sensorImage} />
            </div>
            <div style={styles.sensorInfoContainer}>
              <p style={styles.sensorTitle}>Temperatura</p>
              <p style={styles.sensorValue}>{dispositivo.temperatura}°C</p>
            </div>
          </div>
          <div style={styles.sensorItem}>
            <div style={styles.sensorImageContainer}>
              <img src={humedadImg} alt="Humedad" style={styles.sensorImage} />
            </div>
            <div style={styles.sensorInfoContainer}>
              <p style={styles.sensorTitle}>Humedad</p>
              <p style={styles.sensorValue}>{dispositivo.humedad}%</p>
            </div>
          </div>
          <div style={styles.sensorItem}>
            <div style={styles.sensorImageContainer}>
              <img src={luzImg} alt="Luz" style={styles.sensorImage} />
            </div>
            <div style={styles.sensorInfoContainer}>
              <p style={styles.sensorTitle}>Luz</p>
              <p style={styles.sensorValue}>{dispositivo.luz}%</p>
            </div>
          </div>
        </div>
        <div style={styles.widgetsGrid}>
          <div style={styles.widgetCard}>
            <h3 style={styles.widgetTitle}>Modo de Operación</h3>
            <p style={styles.widgetState}>
              Estado: {dispositivo.automatico ? 'Automático' : 'Manual'}
            </p>
            <button
              style={styles.widgetButton}
              onClick={() => actualizarEstado('automatico', !dispositivo.automatico)}
            >
              Cambiar
            </button>
          </div>
          <div style={styles.widgetCard}>
            <h3 style={styles.widgetTitle}>Ventilador</h3>
            <p style={styles.widgetState}>
              Estado: {dispositivo.ventilador ? 'Encendido' : 'Apagado'}
            </p>
            <button
              style={styles.widgetButton}
              onClick={() => actualizarEstado('ventilador', !dispositivo.ventilador)}
            >
              Cambiar
            </button>
          </div>
          <div style={styles.widgetCard}>
            <h3 style={styles.widgetTitle}>Bomba</h3>
            <p style={styles.widgetState}>
              Estado: {dispositivo.bomba ? 'Encendida' : 'Apagada'}
            </p>
            <button
              style={styles.widgetButton}
              onClick={() => actualizarEstado('bomba', !dispositivo.bomba)}
            >
              Cambiar
            </button>
          </div>
          <div style={styles.widgetCard}>
            <h3 style={styles.widgetTitle}>Foco</h3>
            <p style={styles.widgetState}>
              Estado: {dispositivo.foco ? 'Encendido' : 'Apagado'}
            </p>
            <button
              style={styles.widgetButton}
              onClick={() => actualizarEstado('foco', !dispositivo.foco)}
            >
              Cambiar
            </button>
          </div>
        </div>
        {mensaje && <p style={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default ControlIoT;
