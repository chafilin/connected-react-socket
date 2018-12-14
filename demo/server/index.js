/* eslint-disable */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connections = {};

io.on('connection', function(socket){
	console.log('a user connected');
	const {id} = socket
	connections[id] = { socket };
	connections[id].interval = setInterval(()=>{
		socket.emit('time',new Date())
	}, 1000);
	socket.emit('id', id)
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