// socket.io.js

const http = require('http');
const socketIo = require('socket.io');
const app = require('../server');

const server = http.createServer(app);
const io = socketIo(server);

// Maneja las conexiones de chat
io.on('connection', (socket) => {
  chatController.handleChatConnection(socket);
});

module.exports = io;
