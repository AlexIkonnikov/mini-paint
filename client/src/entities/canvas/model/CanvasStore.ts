import { makeAutoObservable } from 'mobx';

import DrawerHelper from '../../../shared/lib/DrawerContext/DrawerHelper';

class CanvasStore {
  drawer: DrawerHelper | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.drawer = new DrawerHelper(canvas);
  }

  setStrokeColor(color: string) {
    if (this.drawer?.ctx) {
      this.drawer.ctx.strokeStyle = color;
    }
  }

  setStrokeWidth(lineWidth: number) {
    if (this.drawer?.ctx) {
      this.drawer.ctx.lineWidth = lineWidth;
    }
  }

  getRelativeXYCoords(e: React.MouseEvent<HTMLCanvasElement>) {
    if (this.drawer) {
      const rect = this.drawer.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return [x, y];
    }
    return [0, 0];
  }
}

export default new CanvasStore();
