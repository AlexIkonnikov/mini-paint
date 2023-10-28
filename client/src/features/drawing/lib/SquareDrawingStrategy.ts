import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class SquareDrawingStrategy implements IDrawerStrategy {
  drawerHelper: DrawerHelper;

  constructor(drawerHelper: DrawerHelper) {
    this.drawerHelper = drawerHelper;
  }

  get name(): string {
    return 'square';
  }

  beforeDraw(x: number, y: number) {
    this.drawerHelper.makeSnapshot();
    this.drawerHelper.x = x;
    this.drawerHelper.y = y;
  }

  draw(newX: number, newY: number) {
    const { x, y } = this.drawerHelper;
    this.drawerHelper.applySnapshot();
    this.drawerHelper.ctx.beginPath();
    this.drawerHelper.ctx.strokeRect(x, y, newX - x, newY - y);
  }
}

export default SquareDrawingStrategy;
