import { Button } from 'antd';
import { observer } from 'mobx-react-lite';

import { CanvasStore } from '../../../entities/canvas';
import './styles.css';

const DownloadLink = observer(() => {
  const { drawer } = CanvasStore;

  const download = () => {
    if (drawer) {
      const image = drawer.canvas.toDataURL();
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = image;
      link.click();
      link.remove();
    }
  };

  return <Button className="download" type="text" onClick={download} />;
});

export default DownloadLink;
