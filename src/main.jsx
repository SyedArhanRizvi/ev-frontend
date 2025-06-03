import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { WebContext } from './context/WebContext.jsx';

createRoot(document.getElementById('root')).render(
  <WebContext>
    <App />
  </WebContext>,
)
