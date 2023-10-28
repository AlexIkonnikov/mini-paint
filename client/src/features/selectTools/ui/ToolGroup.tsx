import { Radio } from 'antd';
import { useCallback, useState } from 'react';

import './styles.css';
//TODO: fix fsd rule (feature import feature)
import {
  BrushDrawingStrategy,
  CircleDrawingStrategy,
  EraserDrawingStrategy,
  LineDrawingStrategy,
  SquareDrawingStrategy,
} from '../../drawing';
import DrawerContext, { DrawerHelper } from '../../../shared/lib/DrawerContext';
import { Canvas } from '../../../shared/lib/Canvas';

import { Tools } from './types';

const ToolGroup = () => {
  const [tool, setTool] = useState<Tools | null>(Tools.BRUSH);

  const changeTool = useCallback((tool: Tools) => {
    setTool(tool);
  }, []);

  return (
    <Radio.Group optionType="button" className="tool-group" value={tool}>
      <Radio
        className="tool brush"
        value={Tools.BRUSH}
        onClick={() => {
          changeTool(Tools.BRUSH);
          const { ctx } = Canvas.getInstance();
          const strategy = new BrushDrawingStrategy(new DrawerHelper(ctx));
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool square"
        value={Tools.SQUARE}
        onClick={() => {
          changeTool(Tools.SQUARE);
          const { ctx } = Canvas.getInstance();
          const strategy = new SquareDrawingStrategy(new DrawerHelper(ctx));
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool circle"
        value={Tools.CIRCLE}
        onClick={() => {
          changeTool(Tools.CIRCLE);
          const { ctx } = Canvas.getInstance();
          const strategy = new CircleDrawingStrategy(new DrawerHelper(ctx));
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool line"
        value={Tools.LINE}
        onClick={() => {
          changeTool(Tools.LINE);
          const { ctx } = Canvas.getInstance();
          const strategy = new LineDrawingStrategy(new DrawerHelper(ctx));
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool eraser"
        value={Tools.ERASER}
        onClick={() => {
          changeTool(Tools.ERASER);
          const { ctx } = Canvas.getInstance();
          const strategy = new EraserDrawingStrategy(new DrawerHelper(ctx));
          DrawerContext.setStrategy(strategy);
        }}
      />
    </Radio.Group>
  );
};

export default ToolGroup;
