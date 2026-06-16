import { AuthProvider } from './auth/AuthContext'
import AuthGate from './auth/AuthGate'

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <div className="p-6">
          <h1 className="font-heading text-2xl">Signed in</h1>
          <p className="text-muted">Shell will render here.</p>
        </div>
      </AuthGate>
    </AuthProvider>
  )
}
