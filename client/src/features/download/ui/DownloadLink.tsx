import { Button } from 'antd';

import { Canvas } from '../../../shared/lib/Canvas';
import './styles.css';

const DownloadLink = () => {
  const download = () => {
    const { ctx } = Canvas.getInstance();
    const image = ctx.canvas.toDataURL();
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = image;
    link.click();
    link.remove();
  };

  return <Button className="download" type="text" onClick={download} />;
};

export default DownloadLink;
