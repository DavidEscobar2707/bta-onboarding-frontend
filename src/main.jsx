import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FormPage from './FormPage.jsx'

// Simple path-based routing (no react-router needed)
const path = window.location.pathname;
const formMatch = path.match(/^\/form\/(.+)$/);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {formMatch ? <FormPage token={formMatch[1]} /> : <App />}
  </StrictMode>,
)
