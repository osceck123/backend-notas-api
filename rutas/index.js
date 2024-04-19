const {Router} = require('express');
const router = Router()

const { authenticateToken } = require('../middleware/middleware');

//aqui van los controllers requeridos
const {AgregarNotas, BuscarNotas, ActualizarUnaNota, EliminarUnaNota, BuscarTodasNotas} = require('../controller/notas.controller');
const { crearUsuario, buscarTodosLosUsuarios, actualizarUsuario, eliminarUsuario } = require('../controller/usuario.controller');
const {handleChatConnection} = require('../controller/chat.controller');

const {login,  singup} = require('../controller/login_singup.controller'); 
//aqui van las rutas solicitadas

//agregar nota
router.post('/notes', authenticateToken, AgregarNotas);
  
//Buscar todas las notas
router.get('/notes', BuscarNotas);

//BuscarTodasLasNotas
router.get('/notas', BuscarTodasNotas);

//Actualizar una nota 
router.put('/notes/:id',authenticateToken ,ActualizarUnaNota);

//Eliminar una nota 
router.delete('/notes/:id', authenticateToken, EliminarUnaNota);


//rutas de login y singup 
router.post('/login', login);

router.post('/signup', singup);


//rutas para crear un usuario 
router.post('/users',authenticateToken,crearUsuario);
  
router.get('/users', authenticateToken, buscarTodosLosUsuarios);
  
router.put('/users/:id',authenticateToken, actualizarUsuario);
  
router.delete('/users/:id',authenticateToken, eliminarUsuario);


//rutas para el chat 
router.get('/chat', handleChatConnection);


module.exports = router