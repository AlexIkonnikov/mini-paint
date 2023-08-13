import { Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

import './styles.css';
import { CanvasStore } from '../../../entities/canvas';
//TODO: fix fsd rule (feature import feature)
import {
  BrushDrawingStrategy,
  CircleDrawingStrategy,
  EraserDrawingStrategy,
  LineDrawingStrategy,
  SquareDrawingStrategy,
} from '../../drawing';
import { ClientDrawerContext } from '../../../shared/lib/DrawerContext';

import { Tools } from './types';

const ToolGroup = observer(() => {
  const [tool, setTool] = useState<Tools | null>(Tools.BRUSH);
  const { drawer } = CanvasStore;

  const changeTool = useCallback((tool: Tools) => {
    setTool(tool);
  }, []);

  useEffect(() => {
    if (drawer) {
      ClientDrawerContext.setStrategy(new BrushDrawingStrategy(drawer.canvas));
    }
  }, [drawer]);

  if (!drawer) {
    return null;
  }

  return (
    <Radio.Group optionType="button" className="tool-group" value={tool}>
      <Radio
        className="tool brush"
        value={Tools.BRUSH}
        onClick={() => {
          changeTool(Tools.BRUSH);
          ClientDrawerContext.setStrategy(
            new BrushDrawingStrategy(drawer.canvas),
          );
        }}
      />

      <Radio
        className="tool square"
        value={Tools.SQUARE}
        onClick={() => {
          changeTool(Tools.SQUARE);
          ClientDrawerContext.setStrategy(
            new SquareDrawingStrategy(drawer.canvas),
          );
        }}
      />
      <Radio
        className="tool circle"
        value={Tools.CIRCLE}
        onClick={() => {
          changeTool(Tools.CIRCLE);
          ClientDrawerContext.setStrategy(
            new CircleDrawingStrategy(drawer.canvas),
          );
        }}
      />
      <Radio
        className="tool line"
        value={Tools.LINE}
        onClick={() => {
          changeTool(Tools.LINE);
          ClientDrawerContext.setStrategy(
            new LineDrawingStrategy(drawer.canvas),
          );
        }}
      />
      <Radio
        className="tool eraser"
        value={Tools.ERASER}
        onClick={() => {
          changeTool(Tools.ERASER);
          ClientDrawerContext.setStrategy(
            new EraserDrawingStrategy(drawer.canvas),
          );
        }}
      />
    </Radio.Group>
  );
});

export default ToolGroup;
