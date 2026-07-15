import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Zap, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Veuillez saisir votre adresse e-mail.'); return }
    if (!password)     { setError('Veuillez saisir votre mot de passe.'); return }

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header stripe */}
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 shadow-lg">
              <Zap size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FinInfo</h1>
            <p className="text-blue-200 text-sm mt-1 font-medium">Extraction Platform</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <p className="text-gray-500 text-sm text-center mb-7">
              Connectez-vous à votre espace de travail
            </p>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="form-label">Adresse e-mail</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@fininfo.com"
                  className="form-input"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="form-label">Mot de passe</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPwd ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-2"
              >
                Se connecter
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Accès réservé aux collaborateurs de{' '}
              <span className="font-semibold text-primary-700">FinInfo Solutions</span>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-blue-200/70">
            Démo : tout e-mail + mot de passe <code className="bg-white/15 px-1.5 py-0.5 rounded text-blue-100">fininfo2024</code>
          </p>
        </div>
      </div>
    </div>
  )
}
