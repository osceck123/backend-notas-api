const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu nombre de usuario de MySQL
  password: 'my-secret-pw', // Tu contraseña de MySQL
  database: 'notas_db', // El nombre de tu base de datos MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

exports.modules = {connection} 