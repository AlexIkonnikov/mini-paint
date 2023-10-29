import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class CircleDrawingStrategy implements IDrawerStrategy {
  ctx: CanvasRenderingContext2D;
  x = 0;
  y = 0;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
  }

  get name(): string {
    return 'circle';
  }

  beforeDraw(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(newX: number, newY: number): void {
    const { x, y } = this;

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.getRadius(newX, newY), 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  private getRadius(currentX: number, currentY: number) {
    const { x, y } = this;

    const horizontalLeg = x - currentX;
    const verticalLeg = y - currentY;
    return Math.sqrt(Math.pow(horizontalLeg, 2) + Math.pow(verticalLeg, 2));
  }
}

export default CircleDrawingStrategy;
