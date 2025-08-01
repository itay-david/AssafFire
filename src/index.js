import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // אם יש לך קובץ עיצוב

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
