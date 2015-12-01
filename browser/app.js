var socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a connection with the server');
});

whiteboard.on('draw', function(start, end, color){
  socket.emit('drawEvent', {start: start, end: end, color: color});
});

socket.on('otherUser', function(event){
  console.log('app.JS otherUser');
  var start = event.start;
  var end = event.end;
  var color = event.color;
  console.log(whiteboard.draw);
  whiteboard.draw(start, end, color);
})
