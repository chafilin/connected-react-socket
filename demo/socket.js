/* eslint-disable */
import io from 'socket.io-client'

const socket = io('http://localhost:8081')

socket.on('connect',()=>{
	console.log('Connect')
})


export {socket}
