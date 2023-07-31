import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './src/App';

const createPath = () => {
  const today = Number(new Date());
  return today.toString(16);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<App />} />
        <Route path="*" element={<Navigate to={createPath()} replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
