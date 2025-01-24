import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '~/App';
import { setupServer } from '~/services/mirage/server';

if (import.meta.env.DEV) {
  setupServer();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
