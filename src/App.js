import { useSession } from '@vtfk/react-msal'

import { loginRequest } from './config'

import { Students } from './Pages/Students'

const AppContent = () => {
  return (
    <Students />
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
