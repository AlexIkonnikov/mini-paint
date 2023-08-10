import DrawerHelper from '../../../shared/lib/DrawerHelper';

import { IDrawerStrategy } from './DrawerStrategy';

class CircleDrawingStrategy extends DrawerHelper implements IDrawerStrategy {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  get name(): string {
    return 'circle';
  }

  beforeDraw(x: number, y: number) {
    this.makeSnapshot();
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number): void {
    this.applySnapshot();
    this.ctx?.beginPath();
    this.ctx?.arc(this.x, this.y, this.getRadius(x, y), 0, 2 * Math.PI);
    this.ctx?.stroke();
  }

  private getRadius(currentX: number, currentY: number) {
    const horizontalLeg = this.x - currentX;
    const verticalLeg = this.y - currentY;
    return Math.sqrt(Math.pow(horizontalLeg, 2) + Math.pow(verticalLeg, 2));
  }
}

export default CircleDrawingStrategy;
