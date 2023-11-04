export interface IDrawerStrategy {
  beforeDraw?: (x: number, y: number) => void;
  draw: (x: number, y: number) => void;
  afterDraw?: (x: number, y: number) => void;
  get name(): string;
}
