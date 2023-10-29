import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class LineDrawingStrategy implements IDrawerStrategy {
  x = 0;
  y = 0;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
  }

  get name(): string {
    return 'line';
  }

  beforeDraw(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(newX: number, newY: number): void {
    const { x, y } = this;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();
  }
}

export default LineDrawingStrategy;
