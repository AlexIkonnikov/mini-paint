import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import querystring from 'node:querystring'

const port = 8000

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
});

server.listen(port, () => {
  console.log('server has been started');
});

io.on('connection', (socket) => {
  const {roomId, userId} = querystring.parse(socket.request.url?.split('?')[1] || '')
  
  if (typeof roomId !== 'string' || typeof userId !== 'string') {
    return;
  }

  socket.join(roomId);


  socket.on('hello', (user) => {
    socket.to(roomId).emit('hello', user, socket.id);
  });

  socket.on('hello-to', (user, id) => {
    socket.to(id).emit('hello-to', user);
  });

  socket.on('disconnect', () => {
    socket.to(roomId).emit('user-leave', userId);
  })
})
