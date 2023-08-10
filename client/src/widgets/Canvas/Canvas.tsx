import { observer } from 'mobx-react-lite';
import { FC, LegacyRef, useEffect, useRef } from 'react';

import { CanvasStore } from '../../entities/canvas';
import { HistoryStore } from '../../entities/history';
import { ClientDrawerContext } from '../../shared/lib/DrawerContext';
import './styles.css';

const Canvas: FC = observer(() => {
  let isMouseDown = false;
  const canvas: LegacyRef<HTMLCanvasElement> = useRef(null);

  const { drawer } = CanvasStore;

  useEffect(() => {
    if (canvas.current) {
      CanvasStore.setCanvas(canvas.current);
    }
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
  };

  const onMouseUp = (x: number, y: number) => {
    isMouseDown = false;
    ClientDrawerContext.afterDraw?.(x, y);

    if (drawer) {
      const snapshot = drawer.makeSnapshot();
      snapshot && HistoryStore.add(snapshot);
    }
  };

  const onMouseMove = (x: number, y: number) => {
    if (isMouseDown) {
      ClientDrawerContext.draw(x, y);
    }
  };

  const onMouseLeave = (x: number, y: number) => {
    ClientDrawerContext.afterDraw(x, y);
    if (isMouseDown) {
      onMouseUp(x, y);
    }
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvas}
        onMouseDown={withRelativeXYCoords(onMouseDown)}
        onMouseUp={withRelativeXYCoords(onMouseUp)}
        onMouseMove={withRelativeXYCoords(onMouseMove)}
        onMouseLeave={withRelativeXYCoords(onMouseLeave)}
        width={1000}
        height={600}
      />
    </div>
  );
});

export default Canvas;
