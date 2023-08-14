class DrawerHelper {
  snapshot: ImageData | undefined = undefined;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  x = 0;
  y = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
  }

  makeSnapshot() {
    this.snapshot = this.ctx?.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    return this.snapshot;
  }

  applySnapshot() {
    if (this.snapshot) {
      this.ctx?.putImageData(this.snapshot, 0, 0);
    }
  }
}

export default DrawerHelper;
