const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../database/sql');
const {JWT_SECRET, authenticateToken } = require('../middleware/middleware');


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    connection.modules.connection.query('SELECT * FROM users WHERE username = ?', [username], async(error, results) => {
      if (error) {
        console.error('Error creating note:', error);
        res.status(500).send({ message: 'Error creating note' });
        return;
      }
      if (!results || !results.length) { // Verifica si no hay resultados o si la longitud de resultados es cero
        return res.status(401).send({ message: 'Invalid username or password' });
      }
      const user = results[0]; // Obtén el primer resultado
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.send({ token, id:user.id });
    });
  } catch (error) {
    res.status(400).send(error);
  }
}


  const singup = async (req, res) => {

        console.log(connection, "que tiene conection")
    try {
      const { username, password } = req.body;
      console.log(req.body, "que tiene");
      const hashedPassword = await bcrypt.hash(password, 10);
       connection.modules.connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword],(error, results) => {
        if (error) {
          console.error('Error creating note:', error);
          res.status(500).send({ message: 'Error creating note' });
          return;
        }
        console.error('se creating note:', results);
        res.status(201).send({ id: results.insertId, username });
      })
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).send({ message: 'Failed to create user' }); // Enviar un mensaje de error al cliente
    }
  };
  module.exports = {login,  singup}