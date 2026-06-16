import { AuthProvider } from './auth/AuthContext'
import AuthGate from './auth/AuthGate'
import { AppShell } from './shell/AppShell'

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <AppShell />
      </AuthGate>
    </AuthProvider>
  )
}
