import { Canvas } from '../../../shared/lib/Canvas';
import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';
import FreeDraw from '../../../entities/shapes/FreeDraw';
import { ShapeStorage } from '../../../entities/shapes';

class BrushDrawingStrategy implements IDrawerStrategy {
  ctx: CanvasRenderingContext2D;
  freeDraw: FreeDraw;

  constructor() {
    this.ctx = Canvas.getInstance().ctx;
    this.freeDraw = new FreeDraw();
  }

  get name(): string {
    return 'brush';
  }

  beforeDraw(x: number, y: number) {
    this.freeDraw.setStartPoint(x, y);
  }

  draw(x: number, y: number) {
    this.freeDraw.addPoint([x, y]);
    this.freeDraw.follow();
  }

  afterDraw() {
    this.freeDraw.strokeStyle = this.ctx.strokeStyle;
    this.freeDraw.lineWidth = this.ctx.lineWidth;
    ShapeStorage.addShape(this.freeDraw);

    this.freeDraw = new FreeDraw();
  }
}

export default BrushDrawingStrategy;
