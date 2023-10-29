// import ShapeStorage from '../../../entities/shape/ShapeStorage';
// import Square from '../../../entities/shape/Square';
import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class SquareDrawingStrategy implements IDrawerStrategy {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
  }

  get name(): string {
    return 'square';
  }

  beforeDraw(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(newX: number, newY: number) {
    // ShapeStorage.restore();

    const { x, y } = this;
    this.ctx.beginPath();
    this.ctx.strokeRect(x, y, newX - x, newY - y);
  }

  afterDraw(lastX: number, lastY: number) {
    const { x, y } = this;
    this.width = lastX - x;
    this.height = lastY - y;

    // ShapeStorage.addShape(new Square(x, y, this.width, this.height));
  }
}

export default SquareDrawingStrategy;
