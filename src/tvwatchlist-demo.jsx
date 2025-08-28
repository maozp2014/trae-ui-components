import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TVWatchlistDemo from './components/TVWatchlist/demo'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TVWatchlistDemo />
  </React.StrictMode>,
)