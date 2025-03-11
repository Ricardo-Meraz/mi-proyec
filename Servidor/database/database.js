const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🟡 Intentando conectar a MongoDB...');
        console.log('🔍 URI de conexión:', process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB conectado correctamente');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        console.error('🔍 Detalles del error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
