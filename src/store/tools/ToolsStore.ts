import { makeAutoObservable } from 'mobx';

export enum Tools {
  BRUSH = 'Brush',
  SQUARE = 'Square',
  CIRCLE = 'Circle',
  STRAIGHT = 'Straight',
  ERASER = 'Eraser',
}

class ToolsStore {
  color = '#000';
  tool: Tools = Tools.BRUSH;

  constructor() {
    makeAutoObservable(this);
  }

  setColor(color: typeof this.color) {
    this.color = color;
  }

  setTool(tool: Tools) {
    this.tool = tool;
  }
}

export default new ToolsStore();
