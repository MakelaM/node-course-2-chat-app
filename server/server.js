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
    
    socket.emit('newEmail', {
        from: 'mika@example.com',
        text: "Whats up?",
        createAt: "123"
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });
    socket.emit('welcomeMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newUser', {
        from: 'Admin',        
        text: 'User joined!',
        createAt: new Date().getTime()
    });


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});