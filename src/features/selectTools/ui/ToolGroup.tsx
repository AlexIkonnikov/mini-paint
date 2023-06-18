import { Radio, RadioChangeEvent } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

import BrushIcon from '../../../shared/icons/BrushIcon';
import CircleIcon from '../../../shared/icons/CircleIcon';
import EraserIcon from '../../../shared/icons/EraserIcon';
import SquareIcon from '../../../shared/icons/SquareIcon';
import StraightIcon from '../../../shared/icons/StraightIcon';
import ToolsStore, { Tools } from '../../../store/tools/ToolsStore';

const ToolGroup = observer(() => {
  const changeTool = useCallback((e: RadioChangeEvent) => {
    ToolsStore.setTool(e.target.value as Tools);
  }, []);

  return (
    <Radio.Group onChange={changeTool} value={ToolsStore.tool}>
      <Radio value={Tools.BRUSH}>
        <BrushIcon />
      </Radio>
      <Radio value={Tools.SQUARE}>
        <SquareIcon />
      </Radio>
      <Radio value={Tools.CIRCLE}>
        <CircleIcon />
      </Radio>
      <Radio value={Tools.STRAIGHT}>
        <StraightIcon />
      </Radio>
      <Radio value={Tools.ERASER}>
        <EraserIcon />
      </Radio>
    </Radio.Group>
  );
});

export default ToolGroup;
