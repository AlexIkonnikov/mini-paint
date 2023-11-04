import { Canvas } from '../../shared/lib/Canvas';

class Line {
  x = 0;
  y = 0;
  endPoint: [number, number];
  ctx: CanvasRenderingContext2D;
  strokeStyle: typeof this.ctx.strokeStyle | null = null;
  lineWidth: typeof this.ctx.lineWidth | null = null;

  constructor(x: number, y: number, endPoint?: [number, number]) {
    this.x = x;
    this.y = y;
    this.endPoint = endPoint ?? [0, 0];
    this.ctx = Canvas.getInstance().ctx;
  }

  setEndPoint(endPoint: [number, number]) {
    this.endPoint = endPoint;
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

    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(...this.endPoint);
    this.ctx.stroke();

    this.ctx.restore();
  }

  isVisible() {
    return false;
  }

  toJSON() {
    const { x, y, endPoint, strokeStyle } = this;
    return JSON.stringify({
      x,
      y,
      endPoint,
      strokeStyle,
    });
  }
}

export default Line;
