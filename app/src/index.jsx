import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthRouter from './lib/auth';
import { RouterWrappedApp } from './App';
import _api from './lib/api';
// import './theme.css';

window.our = `~${window.ship}`;
window.desk = 'trove';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthRouter>
      <RouterWrappedApp />
    </AuthRouter>
  </StrictMode>
);
