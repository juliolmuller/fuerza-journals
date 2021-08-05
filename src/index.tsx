import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setupServer } from './services/mirage/server';

if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
