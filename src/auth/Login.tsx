import { useState } from 'react'
import { useAuth } from './AuthContext'
import { property } from '../config/property'

export default function Login() {
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = signIn(username, password, remember)
    if (!ok) setError("That username or password didn't match. Try again.")
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <div className="flex-1 flex flex-col justify-end p-6 pt-16 bg-surface">
        <p className="text-xs tracking-widest text-muted uppercase">Welcome to</p>
        <h1 className="font-heading text-4xl mt-1">Bashford</h1>
        <p className="text-muted mt-2 max-w-sm">
          {property.address.line1} · {property.address.cityStateZip}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-canvas p-6 space-y-4 max-w-md w-full mx-auto"
      >
        <label className="block">
          <span className="text-sm text-muted">Username</span>
          <input
            autoCapitalize="none"
            autoCorrect="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full bg-card border-hair border-border rounded-pill px-4 py-3 text-ink"
          />
        </label>
        <label className="block">
          <span className="text-sm text-muted">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-card border-hair border-border rounded-pill px-4 py-3 text-ink"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-sage"
          />
          Keep me signed in on this device
        </label>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-sage text-white rounded-pill py-3 font-medium active:bg-sage-deep active:scale-[0.98] transition"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
