import { ToolBar } from '../widgets/ToolBar';
import { AuthFormModal } from '../features/auth';
import { Canvas } from '../widgets/Canvas';
import './index.css';

function App() {
  return (
    <div className="app">
      <ToolBar />
      <Canvas />
      <AuthFormModal />
    </div>
  );
}

export default App;
