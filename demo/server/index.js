var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

app.get('/new',(req,res)=>{
	console.log('Emmit new')
	io.emit('new', {world:'hello'}, {world:'hello'})
	res.send('Sended')
})

app.get('/old',(req,res)=>{
	console.log('Emmit old')
	io.emit('old', {world:'hello'})
	res.send('Sended old')
})

http.listen(8081, function(){
  console.log('listening on *:8081');
});
