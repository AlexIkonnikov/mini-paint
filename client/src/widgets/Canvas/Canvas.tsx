import { FC, useEffect } from 'react';

import DrawerContext, { DrawerHelper } from '../../shared/lib/DrawerContext';
import Ws from '../../shared/lib/Socket';
import { Canvas as Singleton } from '../../shared/lib/Canvas';
import './styles.css';
import { BrushDrawingStrategy } from '../../features/drawing';

const Canvas: FC = () => {
  let isMouseDown = false;

  /* initial strategy */
  useEffect(() => {
    const { ctx } = Singleton.getInstance();
    DrawerContext.setStrategy(new BrushDrawingStrategy(new DrawerHelper(ctx)));
  }, []);

  const withRelativeXYCoords =
    (cb: (x: number, y: number) => void) =>
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { ctx } = Singleton.getInstance();
      const rect = ctx.canvas.getBoundingClientRect();
      const scaleX = ctx.canvas.width / rect.width;
      const scaleY = ctx.canvas.height / rect.height;

      return cb(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY,
      );
    };

  const onMouseDown = (x: number, y: number) => {
    isMouseDown = true;
    DrawerContext.beforeDraw?.(x, y);
    Ws.socket?.emit('before-draw', DrawerContext.name, x, y);
  };

  const onMouseUp = (x: number, y: number) => {
    isMouseDown = false;
    DrawerContext.afterDraw?.(x, y);
    Ws.socket?.emit('after-draw', DrawerContext.name, x, y);
  };

  const onMouseMove = (x: number, y: number) => {
    if (isMouseDown) {
      DrawerContext.draw(x, y);
      Ws.socket?.emit('draw', DrawerContext.name, x, y);
    }
  };

  const onMouseLeave = (x: number, y: number) => {
    DrawerContext.afterDraw(x, y);
    if (isMouseDown) {
      onMouseUp(x, y);
    }
  };

  return (
    <canvas
      id="canvas"
      onMouseDown={withRelativeXYCoords(onMouseDown)}
      onMouseUp={withRelativeXYCoords(onMouseUp)}
      onMouseMove={withRelativeXYCoords(onMouseMove)}
      onMouseLeave={withRelativeXYCoords(onMouseLeave)}
      width={window.innerWidth * window.devicePixelRatio}
      height={window.innerHeight * window.devicePixelRatio}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    />
  );
};

export default Canvas;
