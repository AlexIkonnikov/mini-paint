import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

import BrushDrawingStrategy from './BrushDrawingStrategy';

class EraserDrawingStrategy
  extends BrushDrawingStrategy
  implements IDrawerStrategy
{
  constructor(canvasCtx: CanvasRenderingContext2D) {
    super(canvasCtx);
  }

  get name(): string {
    return 'eraser';
  }

  afterDraw(): void {
    this.ctx.restore();
  }

  beforeDraw(x: number, y: number): void {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.strokeStyle = 'white';
    }
    super.beforeDraw(x, y);
  }
}

export default EraserDrawingStrategy;
