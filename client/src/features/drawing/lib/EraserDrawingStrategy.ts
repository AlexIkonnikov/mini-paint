import BrushDrawingStrategy from './BrushDrawingStrategy';
import { IDrawerStrategy } from './DrawerStrategy';

class EraserDrawingStrategy
  extends BrushDrawingStrategy
  implements IDrawerStrategy
{
  prevColor: string | CanvasGradient | CanvasPattern = '';

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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