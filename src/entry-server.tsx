import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Runs only during the local build. No Node server is deployed.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
