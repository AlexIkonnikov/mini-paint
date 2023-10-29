import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class BrushDrawingStrategy implements IDrawerStrategy {
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
  }

  get name(): string {
    return 'brush';
  }

  beforeDraw(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}

export default BrushDrawingStrategy;
