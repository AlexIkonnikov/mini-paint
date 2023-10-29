class DrawerHelper {
  snapshot: ImageData | undefined = undefined;
  ctx: CanvasRenderingContext2D;
  x = 0;
  y = 0;

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.ctx = canvasCtx;
  }

  //TODO: try to get rid of this
  makeSnapshot() {
    this.snapshot = this.ctx.getImageData(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    );
    return this.snapshot;
  }

  //TODO: try to get rid of this
  applySnapshot() {
    if (this.snapshot) {
      this.ctx.putImageData(this.snapshot, 0, 0);
    }
  }
}

export default DrawerHelper;
