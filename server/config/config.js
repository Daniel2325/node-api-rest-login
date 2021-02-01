// =================
// PUERTO
// =================
process.env.PORT = process.env.PORT || 3001;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://info-user:XLynvHKw6snQZWPh@cluster0.r16tc.mongodb.net/informacion'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ===========================================
//  Vencimiento del Token
// ===========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========================================
//  SEED de autenticación
// ===========================================
process.env.SEED = process.env.SEED || 'este-es-la-clave-en-dev';