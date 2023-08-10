import { io, Socket } from 'socket.io-client';

import { UserStore } from '../../entities/user';
import { DrawerContext } from '../../features/drawing';

class Ws {
  socket: Socket | null = null;

  init(roomId: string) {
    this.socket = io('ws://localhost:8000', {
      query: {
        roomId,
        userId: UserStore.currentUser?.id,
      },
    });

    this.socket.emit('hello', UserStore.currentUser, this.socket.id);

    this.socket.on('hello', (user, id) => {
      UserStore.addUser(user);
      this.socket?.emit('hello-to', UserStore.currentUser, id);
    });

    this.socket.on('hello-to', user => {
      UserStore.addUser(user);
    });

    this.socket.on('user-leave', (userId: string) => {
      UserStore.removeUser(userId);
    });

    // this.socket?.on('draw', (x: number, y: number) => {
    //   DrawerContext.draw(x, y);
    // });

    // this.socket?.on('before-draw', (x: number, y: number) => {
    //   DrawerContext.beforeDraw(x, y);
    // });
  }

  // draw(event: string, x: number, y: number) {
  //   this.socket?.emit(event, x, y);
  // }

  // beforeDraw(x: number, y: number) {
  //   this.socket?.emit('before-draw', x, y);
  // }
}

export default new Ws();
