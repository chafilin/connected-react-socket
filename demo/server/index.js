/* eslint-disable */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connections = {};

io.on('connection', function(socket){
	console.log('a user connected');
	const {id} = socket
  connections[id] = { socket };
  connections[id].startTime = new Date()
	connections[id].interval = setInterval(()=>{
    const timer = Math.floor((new Date()-connections[id].startTime)/1000);
		socket.emit('time',timer)
	}, 1000);
  socket.emit('id', id)
  socket.on('reset', function(){
    connections[id].startTime = new Date()
  })
  socket.on('disconnect', function(){
		const { interval } = connections[id]
		clearInterval(interval);
		delete connections[id]
    console.log(`user ${id} disconnected`);
  });
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});
