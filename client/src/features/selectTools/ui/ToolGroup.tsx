import { Radio } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
    if (drawer && drawer.ctx) {
      ClientDrawerContext.setStrategy(new BrushDrawingStrategy(drawer.ctx));
    }
  }, [drawer]);

  const context = useMemo(() => {
    return drawer?.ctx;
  }, [drawer]);

  if (!drawer || !context) {
    return null;
  }

  return (
    <Radio.Group optionType="button" className="tool-group" value={tool}>
      <Radio
        className="tool brush"
        value={Tools.BRUSH}
        onClick={() => {
          changeTool(Tools.BRUSH);
          ClientDrawerContext.setStrategy(new BrushDrawingStrategy(context));
        }}
      />

      <Radio
        className="tool square"
        value={Tools.SQUARE}
        onClick={() => {
          changeTool(Tools.SQUARE);
          ClientDrawerContext.setStrategy(new SquareDrawingStrategy(context));
        }}
      />
      <Radio
        className="tool circle"
        value={Tools.CIRCLE}
        onClick={() => {
          changeTool(Tools.CIRCLE);
          ClientDrawerContext.setStrategy(new CircleDrawingStrategy(context));
        }}
      />
      <Radio
        className="tool line"
        value={Tools.LINE}
        onClick={() => {
          changeTool(Tools.LINE);
          ClientDrawerContext.setStrategy(new LineDrawingStrategy(context));
        }}
      />
      <Radio
        className="tool eraser"
        value={Tools.ERASER}
        onClick={() => {
          changeTool(Tools.ERASER);
          ClientDrawerContext.setStrategy(new EraserDrawingStrategy(context));
        }}
      />
    </Radio.Group>
  );
});

export default ToolGroup;
