import { StrictMode } from 'react';
import { Tooltip } from 'react-tooltip';
import { createRoot } from 'react-dom/client';

import 'react-tooltip/dist/react-tooltip.css';

import './index.css';

import App from '@pages/app';

//import { registerServiceWorker } from '@services/main';

//registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Tooltip id="tooltip-event" />
  </StrictMode>
);
