import { io, Socket } from 'socket.io-client';

import { UserStore } from '../../entities/user';
import {
  BrushDrawingStrategy,
  CircleDrawingStrategy,
  LineDrawingStrategy,
  SquareDrawingStrategy,
} from '../../features/drawing';

import DrawerContext from './DrawerContext';

class Ws {
  socket: Socket | null = null;

  init(roomId: string) {
    this.socket = io(`ws://${window.location.hostname}:8000`, {
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

    this.socket?.on('before-draw', (tool: string, x: number, y: number) => {
      if (tool !== DrawerContext.name) {
        setStrategy(tool);
      }
      DrawerContext.beforeDraw(x, y);
    });

    this.socket?.on('draw', (tool: string, x: number, y: number) => {
      if (tool !== DrawerContext.name) {
        setStrategy(tool);
      }
      DrawerContext.draw(x, y);
    });

    this.socket?.on('after-draw', (tool: string, x: number, y: number) => {
      if (tool !== DrawerContext.name) {
        setStrategy(tool);
      }
      DrawerContext.afterDraw(x, y);
    });
  }
}

const setStrategy = (tool: string) => {
  switch (tool) {
    case 'brush':
      DrawerContext.setStrategy(new BrushDrawingStrategy());
      break;
    case 'circle':
      DrawerContext.setStrategy(new CircleDrawingStrategy());
      break;
    case 'square':
      DrawerContext.setStrategy(new SquareDrawingStrategy());
      break;
    case 'line':
      DrawerContext.setStrategy(new LineDrawingStrategy());
      break;
    default:
      DrawerContext.setStrategy(null);
      break;
  }
};

export default new Ws();
