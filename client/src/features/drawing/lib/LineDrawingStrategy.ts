import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class LineDrawingStrategy implements IDrawerStrategy {
  drawerHelper: DrawerHelper;

  constructor(drawerHelper: DrawerHelper) {
    this.drawerHelper = drawerHelper;
  }

  get name(): string {
    return 'line';
  }

  beforeDraw(x: number, y: number) {
    this.drawerHelper.makeSnapshot();
    this.drawerHelper.x = x;
    this.drawerHelper.y = y;
  }

  draw(newX: number, newY: number): void {
    const { x, y } = this.drawerHelper;

    this.drawerHelper.applySnapshot();
    this.drawerHelper.ctx.beginPath();
    this.drawerHelper.ctx.moveTo(x, y);
    this.drawerHelper.ctx.lineTo(newX, newY);
    this.drawerHelper.ctx.stroke();
  }
}

export default LineDrawingStrategy;
