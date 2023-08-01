import { ToolBar } from './widgets/ToolBar';
import { Canvas } from './widgets/Canvas';

import './index.css';

function App() {
  console.log('render APPP');
  new WebSocket('ws://localhost:8000/');
  return (
    <div className="app">
      <ToolBar />
      <Canvas />
    </div>
  );
}

export default App;
