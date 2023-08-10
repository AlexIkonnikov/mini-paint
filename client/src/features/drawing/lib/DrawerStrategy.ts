import DrawerHelper from '../../../shared/lib/DrawerHelper';

export interface IDrawerStrategy extends DrawerHelper {
  beforeDraw?: (x: number, y: number) => void;
  draw: (x: number, y: number) => void;
  afterDraw?: (x: number, y: number) => void;
  get name(): string;
}
