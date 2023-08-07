import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import querystring from 'node:querystring'


const USER_MAP: Record<string, any[]> = {}

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

  const {userId, roomId} = querystring.parse(socket.request.url?.split('?')[1] || '')

  if (typeof roomId !== 'string' || typeof userId !== 'string') {
    return;
  }

  socket.join(roomId);

  socket.on('hello', (user) => {
    socket.emit('user-list', USER_MAP[roomId]);

    const users = USER_MAP[roomId] ;
    if (users) {
      users.push(user);
    } else {
      USER_MAP[roomId] = [user];
    }
    
    socket.to(roomId).emit('hello', user);
  });

  socket.on('disconnect', () => {
    const newUsers = USER_MAP[roomId]?.filter(({id}) => id !== userId);
    if (newUsers) {
      USER_MAP[roomId] = newUsers
    }
    socket.to(roomId).emit('user-leave', userId);
  })
})
