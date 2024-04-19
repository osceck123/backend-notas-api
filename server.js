const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo cors


const app = express();
const PORT = process.env.PORT || 3000;


const router = require('./rutas/index');

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Middlewares para el análisis del cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas CRUD
app.use('/api', router);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
