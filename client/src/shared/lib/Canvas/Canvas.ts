class Canvas {
  ctx: CanvasRenderingContext2D;
  private static instance: Canvas;

  private constructor() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    /* 2d context is always supported, and this context will not change */
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  static getInstance(): Canvas {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }
    return Canvas.instance;
  }
}

export default Canvas;
