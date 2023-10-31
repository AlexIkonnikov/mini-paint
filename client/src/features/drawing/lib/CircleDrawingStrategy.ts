import { Circle, ShapeStorage } from '../../../entities/shapes';
import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class CircleDrawingStrategy implements IDrawerStrategy {
  ctx: CanvasRenderingContext2D;
  circle: Circle;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
    this.circle = new Circle(0, 0);
  }

  get name(): string {
    return 'circle';
  }

  beforeDraw(x: number, y: number) {
    this.circle.x = x;
    this.circle.y = y;
  }

  draw(newX: number, newY: number): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    ShapeStorage.restore();

    this.circle.setRadius(this.getRadius(newX, newY));
    this.circle.draw();
  }

  afterDraw() {
    if (this.circle.isVisible()) {
      return;
    }

    this.circle.strokeStyle = this.ctx.strokeStyle;
    this.circle.lineWidth = this.ctx.lineWidth;
    ShapeStorage.addShape(this.circle);

    this.circle = new Circle(0, 0);
  }

  private getRadius(currentX: number, currentY: number) {
    const { x, y } = this.circle;

    const horizontalLeg = x - currentX;
    const verticalLeg = y - currentY;
    return Math.sqrt(Math.pow(horizontalLeg, 2) + Math.pow(verticalLeg, 2));
  }
}

export default CircleDrawingStrategy;
