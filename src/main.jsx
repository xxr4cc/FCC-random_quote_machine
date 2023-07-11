import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  //Comment StrictMode to disable the dev mode
  //<React.StrictMode>
    <App />
  //</React.StrictMode>,
)
