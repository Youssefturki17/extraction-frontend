import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

const MOCK_USER = {
  name: 'Turki Youssef',
  email: 'turki@fininfo.com',
  role: 'Ingénieur IA',
  avatar: 'TY',
}

const MOCK_PASSWORD = 'fininfo2024'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fininfo_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)

    if (password !== MOCK_PASSWORD) {
      throw new Error('Mot de passe incorrect. Veuillez réessayer.')
    }

    const loggedUser = { ...MOCK_USER, email }
    setUser(loggedUser)
    localStorage.setItem('fininfo_user', JSON.stringify(loggedUser))
    return loggedUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('fininfo_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
