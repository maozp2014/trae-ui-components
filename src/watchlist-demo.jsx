import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WatchlistDemo from './components/Watchlist/WatchlistDemo.tsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WatchlistDemo />
  </React.StrictMode>,
)