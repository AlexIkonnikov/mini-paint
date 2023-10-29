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
import DrawerContext from '../../../shared/lib/DrawerContext';

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
          const strategy = new BrushDrawingStrategy();
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool square"
        value={Tools.SQUARE}
        onClick={() => {
          changeTool(Tools.SQUARE);
          const strategy = new SquareDrawingStrategy();
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool circle"
        value={Tools.CIRCLE}
        onClick={() => {
          changeTool(Tools.CIRCLE);
          const strategy = new CircleDrawingStrategy();
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool line"
        value={Tools.LINE}
        onClick={() => {
          changeTool(Tools.LINE);
          const strategy = new LineDrawingStrategy();
          DrawerContext.setStrategy(strategy);
        }}
      />
      <Radio
        className="tool eraser"
        value={Tools.ERASER}
        onClick={() => {
          changeTool(Tools.ERASER);
          const strategy = new EraserDrawingStrategy();
          DrawerContext.setStrategy(strategy);
        }}
      />
    </Radio.Group>
  );
};

export default ToolGroup;
