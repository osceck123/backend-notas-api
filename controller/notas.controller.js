//aqui van los requerimientos de las conexiones
const connection = require('../database/sql');

//aqui van los requerimientos de los servicios 

//agregar una nota
const AgregarNotas = async (req, res) => {
    try {
      const { title, content, userId} = req.body;
    connection.modules.connection.query('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], (error, results) => {
        if (error) {
          console.error('Error creating note:', error);
          res.status(500).send({ message: 'Error creating note' });
          return;
        }
        res.status(201).send({ id: results.insertId, title, content, userId });
      });
    } catch (error) {
      console.log(error, 'cual es el error al agregar una nota')
      res.status(400).send(error);
    }
  };
  

//buscat todas las notas
const BuscarUnaNota = async (req, res) => {
    try {
      const userId = req.body.id;
      console.log(userId, "que tiene user id")
      connection.modules.connection.query('SELECT * FROM notes WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
          console.error('Error fetching notes:', error);
          res.status(500).send({ message: 'Error fetching notes' });
          return;
        }
        res.send(results);
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const BuscarTodasNotas = async (req, res) => {
    try {
     
      connection.modules.connection.query('SELECT * FROM notes ', (error, results) => {
        if (error) {
          console.error('Error fetching notes:', error);
          res.status(500).send({ message: 'Error fetching notes' });
          return;
        }
        res.send(results);
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
//Actaulizar una nota 
const ActualizarUnaNota = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      connection.modules.connection.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id], (error, results) => {
        if (error) {
          console.error('Error updating note:', error);
          res.status(500).send({ message: 'Error updating note' });
          return;
        }
        res.send({ id, title, content });
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
//Eliminar una nota 
const EliminarUnaNota = async (req, res) => {
    try {
      const { id } = req.params;
      connection.modules.connection.query('DELETE FROM notes WHERE id = ?', [id], (error, results) => {
        if (error) {
          console.error('Error deleting note:', error);
          res.status(500).send({ message: 'Error deleting note' });
          return;
        }
        res.send({ message: 'Note deleted successfully' });
      });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

 //aqui van los exports 
 module.exports = {AgregarNotas, BuscarUnaNota, ActualizarUnaNota, EliminarUnaNota, BuscarTodasNotas} 