import React, { useState } from 'react';
import { 
  FaThermometerHalf, 
  FaTint, 
  FaLightbulb, 
  FaFan, 
  FaWater,
  FaRobot,
  FaHandPaper
} from 'react-icons/fa';

const IoTDashboard = () => {
  /********************************************************
   * DATOS ESTÁTICOS DE EJEMPLO (Sensores)
   ********************************************************/
  const sensorData = {
    temperatura: 29.3, // °C
    humedad: 40,       // %
    luz: 23,           // %
  };

  /********************************************************
   * ESTADO PARA MODO Y ACTUADORES
   * Se controlan mediante useState para simular el toggle
   ********************************************************/
  // Modo: 'Automático' o 'Manual'
  const [modo, setModo] = useState('Automático');

  // Actuadores: true => Encendido, false => Apagado
  const [ventilador, setVentilador] = useState(true);
  const [bomba, setBomba] = useState(true);
  const [foco, setFoco] = useState(true);

  /********************************************************
   * FUNCIONES PARA TOGGLE
   ********************************************************/
  const toggleModo = () => {
    setModo(modo === 'Automático' ? 'Manual' : 'Automático');
  };

  const toggleVentilador = () => {
    setVentilador(!ventilador);
  };

  const toggleBomba = () => {
    setBomba(!bomba);
  };

  const toggleFoco = () => {
    setFoco(!foco);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard IoT</h1>
      
      {/* Sección de Sensores */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Sensores</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <FaThermometerHalf 
              size={60} 
              color={sensorData.temperatura > 30 ? '#e74c3c' : '#3498db'} 
            />
            <h3 style={styles.cardTitle}>Temperatura</h3>
            <p style={styles.value}>{sensorData.temperatura} °C</p>
          </div>
          <div style={styles.card}>
            <FaTint 
              size={60} 
              color={sensorData.humedad > 50 ? '#2980b9' : '#5dade2'} 
            />
            <h3 style={styles.cardTitle}>Humedad</h3>
            <p style={styles.value}>{sensorData.humedad} %</p>
          </div>
          <div style={styles.card}>
            <FaLightbulb 
              size={60} 
              color={sensorData.luz > 50 ? '#f1c40f' : '#7f8c8d'} 
            />
            <h3 style={styles.cardTitle}>Luz</h3>
            <p style={styles.value}>{sensorData.luz} %</p>
          </div>
        </div>
      </section>

      {/* Sección de Modo de Operación */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Modo de Operación</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            {modo === 'Automático' ? (
              <FaRobot size={60} color="#27ae60" />
            ) : (
              <FaHandPaper size={60} color="#c0392b" />
            )}
            <h3 style={styles.cardTitle}>{modo}</h3>
            <p style={styles.value}>
              {modo === 'Automático' ? 'El sistema se autorregula' : 'Control manual activado'}
            </p>
            {/* Botón para cambiar de modo */}
            <button 
              style={{
                ...styles.toggleButton,
                backgroundColor: modo === 'Automático' ? '#3498db' : '#e74c3c'
              }}
              onClick={toggleModo}
            >
              {modo === 'Automático' ? 'Cambiar a Manual' : 'Cambiar a Automático'}
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Actuadores */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Actuadores</h2>
        <div style={styles.cardContainer}>
          {/* Ventilador */}
          <div style={styles.card}>
            <FaFan 
              size={60} 
              color={ventilador ? '#27ae60' : '#c0392b'} 
            />
            <h3 style={styles.cardTitle}>Ventilador</h3>
            <p style={styles.value}>
              {ventilador ? 'Encendido' : 'Apagado'}
            </p>
            <button 
              style={{
                ...styles.toggleButton,
                backgroundColor: ventilador ? '#3498db' : '#e74c3c'
              }}
              onClick={toggleVentilador}
            >
              {ventilador ? 'Apagar' : 'Encender'}
            </button>
          </div>
          {/* Bomba */}
          <div style={styles.card}>
            <FaWater 
              size={60} 
              color={bomba ? '#27ae60' : '#c0392b'} 
            />
            <h3 style={styles.cardTitle}>Bomba</h3>
            <p style={styles.value}>
              {bomba ? 'Encendida' : 'Apagada'}
            </p>
            <button 
              style={{
                ...styles.toggleButton,
                backgroundColor: bomba ? '#3498db' : '#e74c3c'
              }}
              onClick={toggleBomba}
            >
              {bomba ? 'Apagar' : 'Encender'}
            </button>
          </div>
          {/* Foco */}
          <div style={styles.card}>
            <FaLightbulb 
              size={60} 
              color={foco ? '#27ae60' : '#c0392b'} 
            />
            <h3 style={styles.cardTitle}>Foco</h3>
            <p style={styles.value}>
              {foco ? 'Encendido' : 'Apagado'}
            </p>
            <button 
              style={{
                ...styles.toggleButton,
                backgroundColor: foco ? '#3498db' : '#e74c3c'
              }}
              onClick={toggleFoco}
            >
              {foco ? 'Apagar' : 'Encender'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/********************************************************
 * ESTILOS EN LÍNEA
 ********************************************************/
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'normal',
    color: '#555'
  },
  section: {
    marginBottom: '40px'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    margin: '10px'
  },
  cardTitle: {
    marginTop: '10px',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  value: {
    fontSize: '1.5em',
    margin: '10px 0',
    fontWeight: 'bold'
  },
  toggleButton: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '1em'
  }
};

export default IoTDashboard;