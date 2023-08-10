import DrawerHelper from '../../../shared/lib/DrawerHelper';

import { IDrawerStrategy } from './DrawerStrategy';

class SquareDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  get name(): string {
    return 'square';
  }

  beforeDraw(x: number, y: number) {
    this.makeSnapshot();
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number) {
    this.applySnapshot();
    this.ctx?.beginPath();
    this.ctx?.strokeRect(this.x, this.y, x - this.x, y - this.y);
  }
}

export default SquareDrawingStrategy;
