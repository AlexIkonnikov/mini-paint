import { Line, ShapeStorage } from '../../../entities/shapes';
import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class LineDrawingStrategy implements IDrawerStrategy {
  ctx: CanvasRenderingContext2D;
  line: Line;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
    this.line = new Line(0, 0);
  }

  get name(): string {
    return 'line';
  }

  beforeDraw(x: number, y: number) {
    this.line.x = x;
    this.line.y = y;
  }

  draw(newX: number, newY: number): void {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    ShapeStorage.restore();

    this.line.setEndPoint([newX, newY]);
    this.line.draw();
  }

  afterDraw() {
    if (this.line.isVisible()) {
      return;
    }

    this.line.strokeStyle = this.ctx.strokeStyle;
    this.line.lineWidth = this.ctx.lineWidth;
    ShapeStorage.addShape(this.line);
    this.line = new Line(0, 0);
  }
}

export default LineDrawingStrategy;
