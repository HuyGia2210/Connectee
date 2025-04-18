import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthPage from './assets/components/AuthPage/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPage />
  </StrictMode>,
)
