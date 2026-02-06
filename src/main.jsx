import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Simple path-based routing (no react-router needed)
const path = window.location.pathname;
const formMatch = path.match(/^\/form\/(.+)$/);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {formMatch ? <App formToken={formMatch[1]} /> : <App />}
  </StrictMode>,
)
