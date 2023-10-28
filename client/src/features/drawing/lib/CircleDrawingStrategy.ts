import {
  IDrawerStrategy,
  DrawerHelper,
} from '../../../shared/lib/DrawerContext';

class CircleDrawingStrategy implements IDrawerStrategy {
  drawerHelper: DrawerHelper;

  constructor(drawerHelper: DrawerHelper) {
    this.drawerHelper = drawerHelper;
  }

  get name(): string {
    return 'circle';
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
    this.drawerHelper.ctx.arc(x, y, this.getRadius(newX, newY), 0, 2 * Math.PI);
    this.drawerHelper.ctx.stroke();
  }

  private getRadius(currentX: number, currentY: number) {
    const { x, y } = this.drawerHelper;

    const horizontalLeg = x - currentX;
    const verticalLeg = y - currentY;
    return Math.sqrt(Math.pow(horizontalLeg, 2) + Math.pow(verticalLeg, 2));
  }
}

export default CircleDrawingStrategy;
