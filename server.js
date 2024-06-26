const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('message', `${username} has joined the chat`);
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', `${socket.username}: ${msg}`);
    });

    socket.on('disconnect', () => {
        io.emit('message', `${socket.username} has left the chat`);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
