import { Button } from 'antd';

import { ColorPicker } from '../../features/colorPicker';
import { HistorySwitcher } from '../../features/historySwitcher';
import { ToolGroup } from '../../features/selectTools';
import { StrokeWidthPicker } from '../../features/strokeWidthPicker';
import './styles.css';

const ToolBar = () => {
  return (
    <div className="toolbar">
      <ToolGroup />
      <ColorPicker />
      <StrokeWidthPicker />
      <div className="toolbar__right-panel">
        <HistorySwitcher />
        <Button className="control-button control-button__save" type="text" />
      </div>
    </div>
  );
};

export default ToolBar;
