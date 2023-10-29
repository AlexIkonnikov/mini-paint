import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class BrushDrawingStrategy implements IDrawerStrategy {
  drawerHelper: DrawerHelper;

  constructor(drawerHelper: DrawerHelper) {
    this.drawerHelper = drawerHelper;
  }

  get name(): string {
    return 'brush';
  }

  beforeDraw(x: number, y: number) {
    this.drawerHelper.ctx.beginPath();
    this.drawerHelper.ctx.moveTo(x, y);
  }

  draw(x: number, y: number) {
    this.drawerHelper.ctx.lineTo(x, y);
    this.drawerHelper.ctx.stroke();
  }
}

export default BrushDrawingStrategy;
