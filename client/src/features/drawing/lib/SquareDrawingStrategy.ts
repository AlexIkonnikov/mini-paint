import { Square, ShapeStorage } from '../../../entities/shapes';
import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

class SquareDrawingStrategy implements IDrawerStrategy {
  square: Square;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
    this.square = new Square(0, 0);
  }

  //TODO: avoid plain string
  get name(): string {
    return 'square';
  }

  beforeDraw(x: number, y: number) {
    this.square.x = x;
    this.square.y = y;
  }

  draw(newX: number, newY: number) {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    ShapeStorage.restore();

    this.square.setWidth(newX - this.square.x);
    this.square.setHeight(newY - this.square.y);

    this.square.draw();
  }

  afterDraw() {
    if (this.square.isVisible()) {
      return;
    }

    this.square.strokeStyle = this.ctx.strokeStyle;
    this.square.lineWidth = this.ctx.lineWidth;
    ShapeStorage.addShape(this.square);

    this.square = new Square(0, 0);
  }
}

export default SquareDrawingStrategy;
