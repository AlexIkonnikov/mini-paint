import { Button, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useCallback } from 'react';

import { ToolGroup } from '../../features/selectTools';
import useDebounce from '../../shared/hooks/useDebounce';
import ToolsStore from '../../store/tools/ToolsStore';
import './styles.css';

const ToolBar = observer(() => {
  const onChangeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    ToolsStore.setColor(e.target.value);
  }, []);
  const debouncedOnChangeColor = useDebounce(onChangeColor, 200);

  return (
    <div className="toolbar">
      <ToolGroup />
      <Input
        style={{ maxWidth: '100px' }}
        type={'color'}
        onChange={debouncedOnChangeColor}
      />
      <div className="toolbar__right-panel">
        <Button className="control-button control-button__undo" type="text" />
        <Button className="control-button control-button__redo" type="text" />
        <Button className="control-button control-button__save" type="text" />
      </div>
    </div>
  );
});

export default ToolBar;
