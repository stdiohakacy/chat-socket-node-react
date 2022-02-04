const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

let clients = 0;
io.on('connection', (socket) => {
    clients++;
    socket.emit("new-client", { description: `Welcome ${socket.id} connected!` });
    socket.broadcast.emit("new-client", { description: `${clients} connected!` });
    socket.on("disconnect", () => {
        clients--;
        socket.broadcast.emit("new-client", { description: `${clients} disconnected!` });
    });
})

http.listen(3000, () => {
    console.log(`Listening on localhost ${3000}`);
})