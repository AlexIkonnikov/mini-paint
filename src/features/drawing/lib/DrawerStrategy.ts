export interface IDrawerStrategy {
  // canvas: HTMLCanvasElement;
  // ctx: CanvasRenderingContext2D | null;
  beforeDraw?: (x: number, y: number) => void;
  draw: (x: number, y: number) => void;
  afterDraw?: (x: number, y: number) => void;
}
