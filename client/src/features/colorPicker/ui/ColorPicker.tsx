import { Input } from 'antd';
import { ChangeEvent, FC, useCallback } from 'react';

import useDebounce from '../../../shared/hooks/useDebounce';
import { Canvas } from '../../../shared/lib/Canvas';

const ColorPicker: FC = props => {
  const onChangeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { ctx } = Canvas.getInstance();
    ctx.strokeStyle = e.target.value;
  }, []);
  const debouncedOnChangeColor = useDebounce(onChangeColor, 200);

  return (
    <Input
      type={'color'}
      style={{ maxWidth: '100px', marginLeft: '50px' }}
      onChange={debouncedOnChangeColor}
      {...props}
    />
  );
};

export default ColorPicker;
