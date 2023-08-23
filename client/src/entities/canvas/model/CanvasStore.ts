import { makeAutoObservable } from 'mobx';

import DrawerHelper from '../../../shared/lib/DrawerContext/DrawerHelper';

class CanvasStore {
  drawer: DrawerHelper | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      this.drawer = new DrawerHelper(ctx);
    }
  }

  setStrokeColor(color: string) {
    if (this.drawer) {
      this.drawer.ctx.strokeStyle = color;
    }
  }

  setStrokeWidth(lineWidth: number) {
    if (this.drawer) {
      this.drawer.ctx.lineWidth = lineWidth;
    }
  }

  getRelativeXYCoords(e: React.MouseEvent<HTMLCanvasElement>) {
    if (this.drawer) {
      const rect = this.drawer.ctx.canvas.getBoundingClientRect();
      const scaleX = this.drawer.ctx.canvas.width / rect.width;
      const scaleY = this.drawer.ctx.canvas.height / rect.height;

      return [
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY,
      ];
    }
    return [0, 0];
  }

  onResize() {
    if (this.drawer) {
      this.drawer.makeSnapshot();

      const { ctx } = this.drawer;
      ctx.canvas.style.width = window.innerWidth + 'px';
      ctx.canvas.style.height = window.innerHeight + 'px';
      ctx.canvas.width = window.devicePixelRatio * window.innerWidth;
      ctx.canvas.height = window.devicePixelRatio * window.innerHeight;

      this.drawer.applySnapshot();
    }
  }
}

export default new CanvasStore();
