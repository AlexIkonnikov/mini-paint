import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, useCallback } from 'react';

import { CanvasStore } from '../../../entities/canvas';
import useDebounce from '../../../shared/hooks/useDebounce';

const ColorPicker: FC = observer(props => {
  const onChangeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    CanvasStore.setStrokeColor(e.target.value);
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
});

export default ColorPicker;
