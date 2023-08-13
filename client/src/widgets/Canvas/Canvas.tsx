import { FC } from 'react';

import { CanvasStore } from '../../entities/canvas';
import { HistoryStore } from '../../entities/history';
import { ClientDrawerContext } from '../../shared/lib/DrawerContext';
import Ws from '../../shared/lib/Socket';
import './styles.css';

const Canvas: FC = () => {
  let isMouseDown = false;

  const withRelativeXYCoords =
    (cb: (x: number, y: number) => void) =>
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const [x, y] = CanvasStore.getRelativeXYCoords(e);
      return cb(x, y);
    };

  const onMouseDown = (x: number, y: number) => {
    isMouseDown = true;
    ClientDrawerContext.beforeDraw?.(x, y);
    Ws.socket?.emit('before-draw', ClientDrawerContext.name, x, y);
  };

  const onMouseUp = (x: number, y: number) => {
    isMouseDown = false;
    ClientDrawerContext.afterDraw?.(x, y);
    Ws.socket?.emit('after-draw', ClientDrawerContext.name, x, y);

    const { drawer } = CanvasStore;
    if (drawer) {
      const snapshot = drawer.makeSnapshot();
      snapshot && HistoryStore.add(snapshot);
    }
  };

  const onMouseMove = (x: number, y: number) => {
    if (isMouseDown) {
      ClientDrawerContext.draw(x, y);
      Ws.socket?.emit('draw', ClientDrawerContext.name, x, y);
    }
  };

  const onMouseLeave = (x: number, y: number) => {
    ClientDrawerContext.afterDraw(x, y);
    if (isMouseDown) {
      onMouseUp(x, y);
    }
  };

  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      CanvasStore.setCanvas(canvas);
    }
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={handleCanvasRef}
        onMouseDown={withRelativeXYCoords(onMouseDown)}
        onMouseUp={withRelativeXYCoords(onMouseUp)}
        onMouseMove={withRelativeXYCoords(onMouseMove)}
        onMouseLeave={withRelativeXYCoords(onMouseLeave)}
        width={1000}
        height={600}
      />
    </div>
  );
};

export default Canvas;
