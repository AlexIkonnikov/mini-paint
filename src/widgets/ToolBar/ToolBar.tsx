import { Button } from 'antd';

import { ColorPicker } from '../../features/colorPicker';
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
        <Button className="control-button control-button__undo" type="text" />
        <Button className="control-button control-button__redo" type="text" />
        <Button className="control-button control-button__save" type="text" />
      </div>
    </div>
  );
};

export default ToolBar;
