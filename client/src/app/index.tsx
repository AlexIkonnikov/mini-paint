import { ToolBar } from '../widgets/ToolBar';
import { AuthFormModal } from '../features/auth';
import { Canvas } from '../widgets/Canvas';
import './index.css';
import Zoom from '../features/zoom/Zoom';

function App() {
  return (
    <div className="app">
      <ToolBar />
      <Canvas />
      <AuthFormModal />
      <Zoom />
    </div>
  );
}

export default App;
