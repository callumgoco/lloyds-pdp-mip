import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

// Optional: enable Figma-friendly layout overrides when ?figma=1 is present
const params = new URLSearchParams(window.location.search);
if (params.get('figma') === '1') {
  document.body.classList.add('figma-import');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


