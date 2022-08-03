import React from 'react'
import ReactDOM from 'react-dom/client'
import { BaseStyle } from '@vtfk/components'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BaseStyle>
      <App />
    </BaseStyle>
  </React.StrictMode>
)
