import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';

import '@widget/tournament-widget/styles';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
