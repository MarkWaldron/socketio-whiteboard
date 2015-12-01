var path = require('path');
var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');

server.on('request', app);
var io = socketio(server);

var events = [];
io.on('connection', function (socket) {
	console.log(events)
    for(var i=0; i<events.length; i++){
    	socket.emit("otherUser", events[i])
    }
    // This function receives the newly connected socket.
    // This function will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    console.log(socket.id);


    socket.on('drawEvent', function(event){
      console.log('drawEvent');
      events.push(event);
      socket.broadcast.emit('otherUser', event);
    })

    socket.on('disconnect', function(){
      console.log("Client: " + socket.id + " has disconnected");
    });
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
