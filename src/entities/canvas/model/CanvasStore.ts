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
}

export default new CanvasStore();
