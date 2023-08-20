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
      const scaleX = this.drawer.canvas.width / rect.width;
      const scaleY = this.drawer.canvas.height / rect.height;

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
      this.drawer.canvas.style.width = window.innerWidth + 'px';
      this.drawer.canvas.style.height = window.innerHeight + 'px';
      this.drawer.canvas.width = window.devicePixelRatio * window.innerWidth;
      this.drawer.canvas.height = window.devicePixelRatio * window.innerHeight;
      this.drawer.applySnapshot();
    }
  }
}

export default new CanvasStore();
