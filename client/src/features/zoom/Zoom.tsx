import { Button } from 'antd';
import React from 'react';

import { CanvasStore } from '../../entities/canvas';

let scale = 1;

const Zoom = () => {
  const zoomIn = () => {
    const context = CanvasStore.drawer?.ctx;
    if (context) {
      scale = scale * 2;
      context.scale(scale, scale);
    }
  };

  const zoomOut = () => {
    const context = CanvasStore.drawer?.ctx;
    if (context) {
      scale = 1;
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 50,
        bottom: 50,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Button onClick={zoomOut}>-</Button>
      100%
      <Button onClick={zoomIn}>+</Button>
    </div>
  );
};

export default Zoom;
