import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';

import { CanvasStore } from '../../../entities/canvas';

const StrokeWidthPicker = observer(() => {
  const setStrokeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    CanvasStore.setStrokeWidth(Number(e.target.value));
  };

  return (
    <Input
      type="number"
      onChange={setStrokeWidth}
      min={1}
      max={10}
      defaultValue={1}
      style={{ maxWidth: '100px', marginLeft: '50px' }}
    />
  );
});

export default StrokeWidthPicker;
