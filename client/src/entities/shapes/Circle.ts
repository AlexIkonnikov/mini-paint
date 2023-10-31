import { Canvas } from '../../shared/lib/Canvas';

class Circle {
  x = 0;
  y = 0;
  radius = 0;
  ctx: CanvasRenderingContext2D;
  strokeStyle: typeof this.ctx.strokeStyle | null = null;
  lineWidth: typeof this.ctx.lineWidth | null = null;

  constructor(x: number, y: number, radius?: number) {
    this.x = x;
    this.y = y;
    this.radius = radius ?? 0;
    this.ctx = Canvas.getInstance().ctx;
  }

  setRadius(radius: number) {
    this.radius = radius;
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

    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.restore();
  }

  isVisible() {
    return this.radius === 0;
  }

  toJSON() {
    const { x, y, radius, strokeStyle } = this;
    return JSON.stringify({
      x,
      y,
      radius,
      strokeStyle,
    });
  }
}

export default Circle;
