import { IDrawerStrategy } from '../../../shared/lib/DrawerContext';

import BrushDrawingStrategy from './BrushDrawingStrategy';

class EraserDrawingStrategy
  extends BrushDrawingStrategy
  implements IDrawerStrategy
{
  prevColor: string | CanvasGradient | CanvasPattern = '';

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  get name(): string {
    return 'eraser';
  }

  afterDraw(): void {
    if (this.ctx) {
      this.ctx.strokeStyle = this.prevColor;
    }
  }

  beforeDraw(x: number, y: number): void {
    if (this.ctx) {
      this.prevColor = this.ctx.strokeStyle;
      this.ctx.strokeStyle = 'white';
    }
    super.beforeDraw(x, y);
  }
}

export default EraserDrawingStrategy;
