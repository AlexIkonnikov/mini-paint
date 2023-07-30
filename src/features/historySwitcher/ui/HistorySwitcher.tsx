import './styles.css';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useEffect } from 'react';

import { HistoryStore } from '../../../entities/history';
import { CanvasStore } from '../../../entities/canvas';

const HistorySwitcher = observer(() => {
  const { drawer } = CanvasStore;

  const undo = () => {
    const snapshot = HistoryStore.goBack();
    applySnapshot(snapshot);
  };

  const redo = () => {
    const snapshot = HistoryStore.goForward();
    applySnapshot(snapshot);
  };

  const applySnapshot = (snapshot: ImageData | undefined) => {
    if (snapshot && drawer) {
      drawer.ctx?.putImageData(snapshot, 0, 0);
    }
  };

  useEffect(() => {
    if (drawer !== null) {
      const initialState = drawer.makeSnapshot();
      initialState && HistoryStore.add(initialState);
    }
  }, [drawer]);

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
