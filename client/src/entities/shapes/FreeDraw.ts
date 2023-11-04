import { Canvas } from '../../shared/lib/Canvas';

class FreeDraw {
  points: Array<[number, number]>;
  ctx: CanvasRenderingContext2D;
  strokeStyle: typeof this.ctx.strokeStyle | null = null;
  lineWidth: typeof this.ctx.lineWidth | null = null;
  constructor() {
    this.points = [];
    this.ctx = Canvas.getInstance().ctx;
  }

  setStartPoint(x: number, y: number) {
    this.points[0] = [x, y];
    this.ctx.beginPath();
  }

  addPoint(point: (typeof this.points)[0]) {
    this.points.push(point);
  }

  private getLastPoint() {
    return this.points[this.points.length - 1];
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.save();

    if (this.strokeStyle) {
      this.ctx.strokeStyle = this.strokeStyle;
    }

    if (this.lineWidth) {
      this.ctx.lineWidth = this.lineWidth;
    }

    this.points.forEach(([x, y]) => {
      this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();

    this.ctx.restore();
  }

  follow() {
    this.ctx.save();

    if (this.strokeStyle) {
      this.ctx.strokeStyle = this.strokeStyle;
    }

    if (this.lineWidth) {
      this.ctx.lineWidth = this.lineWidth;
    }

    const [x, y] = this.getLastPoint();
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

export default FreeDraw;
