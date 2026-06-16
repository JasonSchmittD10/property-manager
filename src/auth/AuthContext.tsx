// Light client-side gate — NOT real authentication.
// This deters casual access only. Credentials live in `src/config/property.ts`
// (appAccess) and are shipped in the client bundle. Anyone with the bundle can
// recover them. Do not store anything sensitive behind this gate. This is an
// intentional tradeoff for a personal single-tenant app — do not "fix" by adding a
// real backend.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { appAccess } from '../config/property'

interface AuthState {
  isAuthed: boolean
  signIn: (username: string, password: string, remember: boolean) => boolean
  signOut: () => void
}

const STORAGE_KEY = 'bashford.authed'

const AuthCtx = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(false)

  useEffect(() => {
    if (
      sessionStorage.getItem(STORAGE_KEY) === '1' ||
      localStorage.getItem(STORAGE_KEY) === '1'
    ) {
      setIsAuthed(true)
    }
  }, [])

  const signIn = useCallback((username: string, password: string, remember: boolean) => {
    if (username.trim() === appAccess.username && password === appAccess.password) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      if (remember) localStorage.setItem(STORAGE_KEY, '1')
      setIsAuthed(true)
      return true
    }
    return false
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthed(false)
  }, [])

  const value = useMemo(() => ({ isAuthed, signIn, signOut }), [isAuthed, signIn, signOut])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const v = useContext(AuthCtx)
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>')
  return v
}
