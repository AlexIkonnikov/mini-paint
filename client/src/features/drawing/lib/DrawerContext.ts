import { IDrawerStrategy } from './DrawerStrategy';

class DrawerContext {
  private strategy: IDrawerStrategy | null;

  constructor() {
    this.strategy = null;
  }

  public setStrategy(strategy: IDrawerStrategy) {
    this.strategy = strategy;
  }

  public beforeDraw(x: number, y: number) {
    this.strategy?.beforeDraw?.(x, y);
  }

  public afterDraw(x: number, y: number) {
    this.strategy?.afterDraw?.(x, y);
  }

  public draw(x: number, y: number) {
    this.strategy?.draw(x, y);
  }
}

export default new DrawerContext();
