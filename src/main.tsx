import React from 'react'
import ReactDOM from 'react-dom/client'
// Self-hosted fonts (bundled into /dist by Vite — no CDN dependency).
// Cal Sans is a single weight (400). Hanken Grotesk gets 400 + 500.
import '@fontsource/cal-sans/400.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
