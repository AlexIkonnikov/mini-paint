import './styles.css';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useEffect } from 'react';

import { HistoryStore } from '../../../entities/history';
import { CanvasStore } from '../../../entities/canvas';

const HistorySwitcher = observer(() => {
  const { canvas, canvasContext } = CanvasStore;
  const undo = () => {
    const snapshot = HistoryStore.goBack();
    applySnapshot(snapshot);
  };

  const redo = () => {
    const snapshot = HistoryStore.goForward();
    applySnapshot(snapshot);
  };

  const applySnapshot = (snapshot: ImageData | undefined) => {
    if (snapshot) {
      CanvasStore?.canvasContext?.putImageData(snapshot, 0, 0);
    }
  };

  useEffect(() => {
    if (canvas && canvasContext) {
      const initialState = canvasContext.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      HistoryStore.add(initialState);
    }
  }, [canvasContext, canvas]);

  return (
    <>
      <Button
        className="control-button control-button__undo"
        type="text"
        onClick={undo}
        disabled={HistoryStore.hasGoBack === false}
      />
      <Button
        className="control-button control-button__redo"
        type="text"
        onClick={redo}
        disabled={HistoryStore.hasGoForward === false}
      />
    </>
  );
});

export default HistorySwitcher;
