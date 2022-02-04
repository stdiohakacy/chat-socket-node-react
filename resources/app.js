const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// let clients = 0;
// io.on('connection', (socket) => {
//     clients++;
//     socket.emit("new-client", { description: `Welcome ${socket.id} connected!` });
//     socket.broadcast.emit("new-client", { description: `${clients} connected!` });
//     socket.on("disconnect", () => {
//         clients--;
//         socket.broadcast.emit("new-client", { description: `${clients} disconnected!` });
//     });
// })

// const nsp = io.of('/my-nsp');
// nsp.on("connection", (socket) => {
//     nsp.emit('hi', 'Hello everyone!');
// })

// let roomno = 1;
// io.of("/").on("connection", (socket) => {
//     if(io.of("/").adapter.rooms[`room-${roomno}`] && io.of("/").adapter.rooms[`room-${roomno}`].length > 1) {
//         roomno++;
//     }
//     socket.join(`room-${roomno}`);
//     io.sockets.in(`room-${roomno}`).emit('connectToRoom', "You are in room no. " + roomno);
// })

http.listen(3000, () => {
    console.log(`Listening on localhost ${3000}`);
})