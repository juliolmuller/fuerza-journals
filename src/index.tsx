import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { setupServer } from './services/mirage/server';

if (import.meta.env.DEV) {
  setupServer();
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
