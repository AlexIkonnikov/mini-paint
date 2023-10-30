export interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(): void;
}

class ShapeStorage {
  private storage: IShape[];

  constructor() {
    this.storage = [];
  }

  addShape(shape: IShape) {
    this.storage.push(shape);
  }

  getAllShapes() {
    return this.storage;
  }

  restore() {
    this.storage.forEach(it => it.draw());
  }
}

export default new ShapeStorage();
