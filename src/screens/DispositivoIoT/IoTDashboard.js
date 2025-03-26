import React, { useState, useEffect, useRef } from 'react';
import {
  FaThermometerHalf,
  FaTint,
  FaLightbulb,
  FaFan,
  FaWater,
  FaRobot,
  FaHandPaper
} from 'react-icons/fa';
import mqtt from 'mqtt';
import { useUser } from '../UserContext/UserContext';

const MQTT_BROKER = "wss://e1d8872f.ala.dedicated.aws.emqxcloud.com:8084/mqtt";
const MQTT_OPTIONS = {
  username: 'erisouo',
  password: '12dejulio',
  clientId: 'mqttx_c33a976b',
};

const TOPICS = {
  temperatura: "proyec/temperatura",
  humedad: "proyec/humedad",
  luz: "proyec/luz",
  modo: "proyec/modo",
  ventilador: "proyec/ventilador",
  bomba: "proyec/bomba",
  foco: "proyec/foco"
};

const IoTDashboard = () => {
  const { user } = useUser();

  const [sensorData, setSensorData] = useState({
    temperatura: 0,
    humedad: 0,
    luz: 0,
  });

  const [modo, setModo] = useState('Automático');
  const [ventilador, setVentilador] = useState(false);
  const [bomba, setBomba] = useState(false);
  const [foco, setFoco] = useState(false);
  const [client, setClient] = useState(null);
  const updateTimer = useRef(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);
    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('🔌 Conectado a MQTT');
      Object.values(TOPICS).forEach(topic => {
        mqttClient.subscribe(topic, err => {
          if (err) console.error(`❌ Error al suscribirse a ${topic}:`, err);
        });
      });
    });

    mqttClient.on('message', (topic, message) => {
      const msg = message.toString();
      switch (topic) {
        case TOPICS.temperatura:
          setSensorData(prev => ({ ...prev, temperatura: parseFloat(msg) }));
          break;
        case TOPICS.humedad:
          setSensorData(prev => ({ ...prev, humedad: parseFloat(msg) }));
          break;
        case TOPICS.luz:
          setSensorData(prev => ({ ...prev, luz: parseFloat(msg) }));
          break;
        case TOPICS.modo:
          setModo(msg);
          break;
        case TOPICS.ventilador:
          setVentilador(msg === '1');
          break;
        case TOPICS.bomba:
          setBomba(msg === '1');
          break;
        case TOPICS.foco:
          setFoco(msg === '1');
          break;
        default:
          break;
      }
    });

    mqttClient.on('error', err => {
      console.error('Error MQTT:', err);
    });

    return () => mqttClient.end();
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    if (updateTimer.current) clearTimeout(updateTimer.current);
    updateTimer.current = setTimeout(() => {
      updateDeviceData();
    }, 1000);
  }, [sensorData, ventilador, bomba, foco]);

  const publishCommand = (topic, value) => {
    if (client) {
      client.publish(topic, value);
      console.log(`📤 MQTT -> ${topic}: ${value}`);
    }
  };

  const updateDeviceData = async () => {
    const data = {
      email: user.email,
      foco,
      bomba,
      ventilador,
      temperatura: sensorData.temperatura,
      humedad: sensorData.humedad,
      luz: sensorData.luz,
      ip: '192.168.252.128' // ⚠️ Asegúrate que coincida con la IP registrada
      // ❌ No enviamos modo
    };

    try {
      const response = await fetch('https://servidor-bbkq.vercel.app/dispositivos/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Datos actualizados:', result);
      } else {
        console.error('❌ Error al actualizar:', result.mensaje);
      }
    } catch (err) {
      console.error('🌐 Error de red:', err);
    }
  };

  const toggleModo = () => {
    const nuevoModo = modo === 'Automático' ? 'Manual' : 'Automático';
    setModo(nuevoModo);
    publishCommand(TOPICS.modo, nuevoModo);
  };

  const toggleActuador = (estado, setEstado, topic) => {
    const nuevo = !estado;
    setEstado(nuevo);
    publishCommand(topic, nuevo ? '1' : '0');
    updateDeviceData();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard IoT</h1>

      {/* Sensores */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Sensores</h2>
        <div style={styles.cardContainer}>
          <SensorCard icon={<FaThermometerHalf size={60} color={sensorData.temperatura > 30 ? '#e74c3c' : '#3498db'} />} label="Temperatura" value={`${sensorData.temperatura} °C`} />
          <SensorCard icon={<FaTint size={60} color={sensorData.humedad > 50 ? '#2980b9' : '#5dade2'} />} label="Humedad" value={`${sensorData.humedad} %`} />
          <SensorCard icon={<FaLightbulb size={60} color={sensorData.luz > 50 ? '#f1c40f' : '#7f8c8d'} />} label="Luz" value={`${sensorData.luz} %`} />
        </div>
      </section>

      {/* Modo */}
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
              {modo === 'Automático'
                ? 'El sistema se autorregula'
                : 'Control manual activado'}
            </p>
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

      {/* Actuadores */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Actuadores</h2>
        <div style={styles.cardContainer}>
          <ActuadorCard
            icon={<FaFan size={60} color={ventilador ? '#27ae60' : '#c0392b'} />}
            label="Ventilador"
            estado={ventilador}
            onToggle={() => toggleActuador(ventilador, setVentilador, TOPICS.ventilador)}
          />
          <ActuadorCard
            icon={<FaWater size={60} color={bomba ? '#27ae60' : '#c0392b'} />}
            label="Bomba"
            estado={bomba}
            onToggle={() => toggleActuador(bomba, setBomba, TOPICS.bomba)}
          />
          <ActuadorCard
            icon={<FaLightbulb size={60} color={foco ? '#27ae60' : '#c0392b'} />}
            label="Foco"
            estado={foco}
            onToggle={() => toggleActuador(foco, setFoco, TOPICS.foco)}
          />
        </div>
      </section>
    </div>
  );
};

const SensorCard = ({ icon, label, value }) => (
  <div style={styles.card}>
    {icon}
    <h3 style={styles.cardTitle}>{label}</h3>
    <p style={styles.value}>{value}</p>
  </div>
);

const ActuadorCard = ({ icon, label, estado, onToggle }) => (
  <div style={styles.card}>
    {icon}
    <h3 style={styles.cardTitle}>{label}</h3>
    <p style={styles.value}>{estado ? 'Encendido' : 'Apagado'}</p>
    <button
      style={{
        ...styles.toggleButton,
        backgroundColor: estado ? '#3498db' : '#e74c3c',
      }}
      onClick={onToggle}
    >
      {estado ? 'Apagar' : 'Encender'}
    </button>
  </div>
);

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'normal',
    color: '#555',
  },
  section: {
    marginBottom: '40px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    margin: '10px',
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
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '1em',
  },
};

export default IoTDashboard;
