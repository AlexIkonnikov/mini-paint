import DrawerHelper from './DrawerHelper';
import { IDrawerStrategy } from './DrawerStrategy';

class BrushDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  beforeDraw(x: number, y: number) {
    this.ctx?.beginPath();
    this.ctx?.moveTo(x, y);
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}

export default BrushDrawingStrategy;
