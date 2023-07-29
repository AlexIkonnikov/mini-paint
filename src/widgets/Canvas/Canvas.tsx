import { observer } from 'mobx-react-lite';
import { FC, LegacyRef, useEffect, useRef } from 'react';

import { CanvasStore } from '../../entities/canvas';
import { DrawerContext } from '../../features/drawing';

import './styles.css';

const Canvas: FC = observer(() => {
  let isMouseDown = false;
  const canvas: LegacyRef<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    if (canvas.current) {
      CanvasStore.setCanvas(canvas.current);
    }
  }, []);

  const withRelativeXYCoords =
    (cb: (x: number, y: number) => void) =>
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { canvas } = CanvasStore;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return cb(x, y);
      }
      return cb(0, 0);
    };

  const onMouseDown = (x: number, y: number) => {
    isMouseDown = true;
    DrawerContext?.beforeDraw(x, y);
  };

  const onMouseUp = (x: number, y: number) => {
    isMouseDown = false;
    DrawerContext?.afterDraw(x, y);
  };

  const onMouseMove = (x: number, y: number) => {
    if (isMouseDown) {
      DrawerContext.draw(x, y);
    }
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvas}
        onMouseDown={withRelativeXYCoords(onMouseDown)}
        onMouseUp={withRelativeXYCoords(onMouseUp)}
        onMouseMove={withRelativeXYCoords(onMouseMove)}
        onMouseLeave={withRelativeXYCoords(onMouseUp)}
        width={1000}
        height={600}
      />
    </div>
  );
});

export default Canvas;
