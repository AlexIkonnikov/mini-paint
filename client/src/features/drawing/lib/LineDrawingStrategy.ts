import DrawerHelper from '../../../shared/lib/DrawerHelper';

import { IDrawerStrategy } from './DrawerStrategy';

class LineDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  beforeDraw(x: number, y: number) {
    this.makeSnapshot();
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number): void {
    this.applySnapshot();
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.x, this.y);
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}

export default LineDrawingStrategy;
