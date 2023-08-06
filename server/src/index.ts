import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const USER_LIST: Array<Record<string, any>> = [];

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

  socket.on('hello', (roomId, user) => {
    socket.emit('user-list', USER_LIST);
    USER_LIST.push(user);

    socket.broadcast.emit('hello', user)
  });
})
