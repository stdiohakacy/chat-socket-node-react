const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const { addUser, getUsersInRoom, removeUser, getUser } = require('./users')
const router = require('./router');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, name, room });
        if(error) return callback(error);
        socket.join(room);
        socket.emit("message", { user: 'admin', text: `${user.name} welcome to room ${user.room}` });
        socket.broadcast.emit("message", { user: 'admin', text: `${user.name} has joined!` });
        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})

httpServer.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));
