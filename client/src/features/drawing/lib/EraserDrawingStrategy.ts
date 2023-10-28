import {
  DrawerHelper,
  IDrawerStrategy,
} from '../../../shared/lib/DrawerContext';

import BrushDrawingStrategy from './BrushDrawingStrategy';

class EraserDrawingStrategy
  extends BrushDrawingStrategy
  implements IDrawerStrategy
{
  constructor(drawerHelper: DrawerHelper) {
    super(drawerHelper);
  }

  get name(): string {
    return 'eraser';
  }

  afterDraw(): void {
    this.drawerHelper.ctx.restore();
  }

  beforeDraw(x: number, y: number): void {
    this.drawerHelper.ctx.save();
    this.drawerHelper.ctx.strokeStyle = 'white';
    super.beforeDraw(x, y);
  }
}

export default EraserDrawingStrategy;
