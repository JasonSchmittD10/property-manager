import { useAuth } from './AuthContext'
import Login from './Login'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth()
  return isAuthed ? <>{children}</> : <Login />
}
