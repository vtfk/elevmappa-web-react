import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'

import { BrowserTracing } from '@sentry/tracing'
import { BaseStyle } from '@vtfk/components'
import { MsalProvider } from '@vtfk/react-msal'

import pkg from '../package.json'
import App from './App'

import { AUTH, loginRequest, SENTRY } from './config'

import './index.css'

const { name, version } = pkg

if (SENTRY.ENABLED) {
  Sentry.init({
    ...SENTRY,
    release: `${name}@${version}`,
    autoSessionTracking: true,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  })
  console.debug('Sentry initialized')
}

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
