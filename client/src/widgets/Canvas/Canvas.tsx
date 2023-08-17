import { FC, useEffect } from 'react';

import { CanvasStore } from '../../entities/canvas';
import { HistoryStore } from '../../entities/history';
import { ClientDrawerContext } from '../../shared/lib/DrawerContext';
import Ws from '../../shared/lib/Socket';
import './styles.css';

const Canvas: FC = () => {
  let isMouseDown = false;

  useEffect(() => {
    const onResize = () => {
      if (CanvasStore.drawer) {
        console.log('onResize', window.innerWidth, window.innerHeight);
        CanvasStore.drawer.canvas.width = window.innerWidth;
        CanvasStore.drawer.canvas.height = window.innerHeight;
        CanvasStore.drawer.canvas.style.width = window.innerWidth + 'px';
        CanvasStore.drawer.canvas.style.height = window.innerHeight + 'px';
      }
    };
    window.addEventListener('resize', onResize, true);

    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    <canvas
      ref={handleCanvasRef}
      onMouseDown={withRelativeXYCoords(onMouseDown)}
      onMouseUp={withRelativeXYCoords(onMouseUp)}
      onMouseMove={withRelativeXYCoords(onMouseMove)}
      onMouseLeave={withRelativeXYCoords(onMouseLeave)}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    />
  );
};

export default Canvas;
