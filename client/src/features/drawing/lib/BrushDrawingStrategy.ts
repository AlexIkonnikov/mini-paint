import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class BrushDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvasCtx: CanvasRenderingContext2D) {
    super(canvasCtx);
  }

  get name(): string {
    return 'brush';
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
