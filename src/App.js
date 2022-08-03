import { useSession } from '@vtfk/react-msal'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { loginRequest } from './config'

import { Layout } from './Layout'

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

function App () {
  const { isAuthenticated, login, authStatus } = useSession()

  if (['pending'].includes(authStatus)) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    login(loginRequest)
    return <></>
  }

  if (isAuthenticated && authStatus === 'finished') {
    return <AppContent />
  }
}

export default App
