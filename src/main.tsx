import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'react-tooltip/dist/react-tooltip.css';

import './index.css';

import App from '@pages/app';
import { Tooltip } from 'react-tooltip';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Tooltip id="tooltip-event" />
  </StrictMode>
);
