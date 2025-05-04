const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-Location", function(data) {
        io.emit("receive-Location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function() {
        io.emit("user disconnected", socket.id);
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
