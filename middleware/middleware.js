const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


  // Rutas de autenticación login
  const JWT_SECRET = 'your-secret-key'; // Cambia esto por una clave secreta segura

// Middleware para verificar el token JWT en las solicitudes protegidas
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(403).send({ message: 'Forbidden' });
    }
  };  

  module.exports = {JWT_SECRET, authenticateToken }


