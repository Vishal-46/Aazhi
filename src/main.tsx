import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './ref/styles.css';
import './ref/About.css';
import './ref/certificate-showcase.css';
import './ref/ref-extra.css';
import './ref/forms.css';
import App from './App';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Missing #root element in index.html');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
