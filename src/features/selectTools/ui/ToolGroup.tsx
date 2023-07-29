import { Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';

import './styles.css';
import { CanvasStore } from '../../../entities/canvas';
//TODO: fix fsd rule (feature import feature)
import {
  BrushDrawingStrategy,
  CircleDrawingStrategy,
  DrawerContext,
  EraserDrawingStrategy,
  LineDrawingStrategy,
  SquareDrawingStrategy,
} from '../../drawing';

import { Tools } from './types';

const ToolGroup = observer(() => {
  const [tool, setTool] = useState<Tools | null>(Tools.BRUSH);
  const { canvas } = useMemo(() => CanvasStore, []);
  const changeTool = useCallback((tool: Tools) => {
    setTool(tool);
  }, []);

  useEffect(() => {
    if (canvas) {
      DrawerContext.setStrategy(new BrushDrawingStrategy(canvas));
    }
  }, [canvas]);

  if (!canvas) {
    return null;
  }

  return (
    <Radio.Group optionType="button" className="tool-group" value={tool}>
      <Radio
        className="tool brush"
        value={Tools.BRUSH}
        onClick={() => {
          changeTool(Tools.BRUSH);
          DrawerContext.setStrategy(new BrushDrawingStrategy(canvas));
        }}
      />

      <Radio
        className="tool square"
        value={Tools.SQUARE}
        onClick={() => {
          changeTool(Tools.SQUARE);
          DrawerContext.setStrategy(new SquareDrawingStrategy(canvas));
        }}
      />
      <Radio
        className="tool circle"
        value={Tools.CIRCLE}
        onClick={() => {
          changeTool(Tools.CIRCLE);
          DrawerContext.setStrategy(new CircleDrawingStrategy(canvas));
        }}
      />
      <Radio
        className="tool line"
        value={Tools.LINE}
        onClick={() => {
          changeTool(Tools.LINE);
          DrawerContext.setStrategy(new LineDrawingStrategy(canvas));
        }}
      />
      <Radio
        className="tool eraser"
        value={Tools.ERASER}
        onClick={() => {
          changeTool(Tools.ERASER);
          DrawerContext.setStrategy(new EraserDrawingStrategy(canvas));
        }}
      />
    </Radio.Group>
  );
});

export default ToolGroup;
