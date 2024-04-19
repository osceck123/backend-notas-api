const bcrypt = require('bcryptjs');
const connection = require('../database/sql');


// Usuario crear
const crearUsuario = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Buscar todos los usuarios
  const buscarTodosLosUsuarios = async (req, res) => {
    try {
      const [rows] = await connection.execute('SELECT * FROM users');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Actualizar un usuario
  const actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, hashedPassword, id]);
      res.send({ id, username, password: hashedPassword });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Eliminar un usuario
  const eliminarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      await connection.execute('DELETE FROM users WHERE id = ?', [id]);
      res.send({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  module.exports = { crearUsuario, buscarTodosLosUsuarios, actualizarUsuario, eliminarUsuario };