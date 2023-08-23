import { io, Socket } from 'socket.io-client';

import { UserStore } from '../../entities/user';
import {
  BrushDrawingStrategy,
  CircleDrawingStrategy,
  EraserDrawingStrategy,
  LineDrawingStrategy,
  SquareDrawingStrategy,
} from '../../features/drawing';

import { ServerDrawerContext } from './DrawerContext';

class Ws {
  socket: Socket | null = null;

  init(roomId: string, canvas: HTMLCanvasElement) {
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
      if (tool !== ServerDrawerContext.name) {
        selectStrategy(tool, canvas);
      }
      ServerDrawerContext.beforeDraw(x, y);
    });

    this.socket?.on('draw', (tool: string, x: number, y: number) => {
      if (tool !== ServerDrawerContext.name) {
        selectStrategy(tool, canvas);
      }
      ServerDrawerContext.draw(x, y);
    });

    this.socket?.on('after-draw', (tool: string, x: number, y: number) => {
      if (tool !== ServerDrawerContext.name) {
        selectStrategy(tool, canvas);
      }
      ServerDrawerContext.afterDraw(x, y);
    });
  }
}

const selectStrategy = (tool: string, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    return;
  }

  switch (tool) {
    case 'brush':
      ServerDrawerContext.setStrategy(new BrushDrawingStrategy(ctx));
      break;
    case 'circle':
      ServerDrawerContext.setStrategy(new CircleDrawingStrategy(ctx));
      break;
    case 'square':
      ServerDrawerContext.setStrategy(new SquareDrawingStrategy(ctx));
      break;
    case 'line':
      ServerDrawerContext.setStrategy(new LineDrawingStrategy(ctx));
      break;
    case 'eraser':
      ServerDrawerContext.setStrategy(new EraserDrawingStrategy(ctx));
  }
};

export default new Ws();
