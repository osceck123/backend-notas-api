// chat.controller.js

const io = require('../socketIO/socket.io'); // Importa la instancia de socket.io

// Maneja la conexión de un nuevo cliente de chat
const handleChatConnection = (socket) => {
  console.log('Usuario conectado al chat');

  // Maneja el evento 'sendMessage' para recibir y retransmitir mensajes
  socket.on('sendMessage', (data) => {
    console.log('Mensaje recibido:', data);
    io.emit('receiveMessage', data); // Emite el mensaje a todos los clientes conectados
  });

  // Maneja la desconexión del cliente de chat
  socket.on('disconnect', () => {
    console.log('Usuario desconectado del chat');
  });
};

module.exports = { handleChatConnection };
