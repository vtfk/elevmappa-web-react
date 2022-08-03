import React from 'react'
import ReactDOM from 'react-dom'
import { BaseStyle } from '@vtfk/components'
import { MsalProvider } from '@vtfk/react-msal'
import App from './App'

import { AUTH, loginRequest } from './config'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BaseStyle>
      <MsalProvider config={AUTH} scopes={loginRequest}>
        <App />
      </MsalProvider>
    </BaseStyle>
  </React.StrictMode>,
  document.getElementById('root')
)
