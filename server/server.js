const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});



server.listen(port, () => {
    console.log(`Started on port ${port}`);
});