import { Input } from 'antd';
import { ChangeEvent } from 'react';

import { Canvas } from '../../../shared/lib/Canvas';

const StrokeWidthPicker = () => {
  const setStrokeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const { ctx } = Canvas.getInstance();
    ctx.lineWidth = Number(e.target.value);
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
};

export default StrokeWidthPicker;
