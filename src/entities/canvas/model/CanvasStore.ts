import { makeAutoObservable } from 'mobx';

class CanvasStore {
  canvas: HTMLCanvasElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  }

  setStrokeColor(color: string) {
    if (this.canvasContext) {
      this.canvasContext.strokeStyle = color;
    }
  }

  setStrokeWidth(lineWidth: number) {
    if (this.canvasContext) {
      this.canvasContext.lineWidth = lineWidth;
    }
  }

  getRelativeXYCoords(e: React.MouseEvent<HTMLCanvasElement>) {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return [x, y];
    }
    return [0, 0];
  }
}

export default new CanvasStore();
