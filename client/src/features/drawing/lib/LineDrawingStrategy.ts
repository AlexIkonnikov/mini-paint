import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class LineDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvasCtx: CanvasRenderingContext2D) {
    super(canvasCtx);
  }

  get name(): string {
    return 'line';
  }

  beforeDraw(x: number, y: number) {
    this.makeSnapshot();
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number): void {
    this.applySnapshot();
    this.ctx?.beginPath();
    this.ctx?.moveTo(this.x, this.y);
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}

export default LineDrawingStrategy;
