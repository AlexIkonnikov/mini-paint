import UserList from '../../entities/user/ui/UserList';
import { ColorPicker } from '../../features/colorPicker';
import DownloadLink from '../../features/download/ui/DownloadLink';
import { HistorySwitcher } from '../../features/historySwitcher';
import { ToolGroup } from '../../features/selectTools';
import { StrokeWidthPicker } from '../../features/strokeWidthPicker';
import './styles.css';

const ToolBar = () => {
  return (
    <div className="toolbar">
      <ToolGroup />
      <ColorPicker />
      <StrokeWidthPicker />
      <div style={{ margin: 'auto' }}>
        <UserList />
      </div>
      <div className="toolbar__right-panel">
        <HistorySwitcher />
        <DownloadLink />
      </div>
    </div>
  );
};

export default ToolBar;
