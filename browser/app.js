var socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a connection with the server');
});

whiteboard.on('draw', function(start, end, color){
  socket.emit('drawEvent', {start: start, end: end, color: color});
});

socket.on('otherUser', function(event){
  var start = event.start;
  var end = event.end;
  var color = event.color;
  whiteboard.draw(start, end, color);
})
