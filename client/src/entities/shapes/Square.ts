import { Canvas } from '../../shared/lib/Canvas';

class Square {
  x = 0;
  y = 0;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  strokeStyle: typeof this.ctx.strokeStyle | null = null;
  lineWidth: typeof this.ctx.lineWidth | null = null;

  constructor(x: number, y: number, width?: number, height?: number) {
    this.x = x;
    this.y = y;
    this.width = width ?? 0;
    this.height = height ?? 0;

    this.ctx = Canvas.getInstance().ctx;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
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

    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  isVisible() {
    return this.width === 0 && this.height === 0;
  }

  toJSON() {
    const { x, y, width, height, strokeStyle } = this;
    return JSON.stringify({
      x,
      y,
      width,
      height,
      strokeStyle,
    });
  }
}

export default Square;
