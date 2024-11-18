const sql = require('mssql');

const config = {
  server: 'localhost', // or use '(LocalDb)\\MSSQLLocalDB'
  database: 'Buzzblen',
  options: {
    encrypt: true,
    trustServerCertificate: true, // For local dev environments
  },
  driver: 'tedious', // Use the tedious driver for more compatibility
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

module.exports = {
  connectDB,
  sql
};
