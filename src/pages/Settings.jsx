import { useState } from 'react'
import { User, Lock, Sliders, CheckCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

const LANGUAGES = ['Français', 'English', 'العربية']
const MODELS    = ['Docling', 'MinerU', 'PaddleOCR']

export default function Settings() {
  const { user } = useAuth()

  // Password form state
  const [currentPwd, setCurrentPwd]   = useState('')
  const [newPwd, setNewPwd]           = useState('')
  const [confirmPwd, setConfirmPwd]   = useState('')
  const [pwdSuccess, setPwdSuccess]   = useState(false)
  const [pwdError, setPwdError]       = useState('')

  // Preferences state
  const [defaultModel, setDefaultModel] = useState('Docling')
  const [language, setLanguage]         = useState('Français')
  const [prefSuccess, setPrefSuccess]   = useState(false)

  const handlePasswordSave = (e) => {
    e.preventDefault()
    setPwdError('')
    setPwdSuccess(false)

    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdError('Tous les champs sont requis.')
      return
    }
    if (newPwd.length < 8) {
      setPwdError('Le nouveau mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (newPwd !== confirmPwd) {
      setPwdError('Les mots de passe ne correspondent pas.')
      return
    }

    // Mock success
    setPwdSuccess(true)
    setCurrentPwd('')
    setNewPwd('')
    setConfirmPwd('')
    setTimeout(() => setPwdSuccess(false), 4000)
  }

  const handlePrefSave = () => {
    setPrefSuccess(true)
    setTimeout(() => setPrefSuccess(false), 3000)
  }

  return (
    <div className="page-container max-w-3xl mx-auto space-y-6">
      {/* Profile */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
            <User size={16} className="text-primary-700" />
          </div>
          <p className="section-title mb-0">Profil utilisateur</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {user?.avatar || 'TY'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="mt-1 inline-block text-xs bg-primary-50 text-primary-700 border border-primary-100 px-2.5 py-0.5 rounded-full font-medium">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Nom complet</label>
            <input value={user?.name || ''} readOnly className="form-input bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label">Adresse e-mail</label>
            <input value={user?.email || ''} readOnly className="form-input bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label">Rôle</label>
            <input value={user?.role || ''} readOnly className="form-input bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="form-label">Organisation</label>
            <input value="FinInfo Solutions" readOnly className="form-input bg-gray-50 cursor-not-allowed" />
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Pour modifier vos informations de profil, contactez l'administrateur système.
        </p>
      </Card>

      {/* Password change */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
            <Lock size={16} className="text-amber-600" />
          </div>
          <p className="section-title mb-0">Changer le mot de passe</p>
        </div>

        {pwdSuccess && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-4 text-sm">
            <CheckCircle size={15} />
            Mot de passe modifié avec succès !
          </div>
        )}
        {pwdError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">
            {pwdError}
          </div>
        )}

        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div>
            <label htmlFor="current-pwd" className="form-label">Mot de passe actuel</label>
            <input
              id="current-pwd"
              type="password"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              className="form-input"
              placeholder="••••••••"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="new-pwd" className="form-label">Nouveau mot de passe</label>
              <input
                id="new-pwd"
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="form-input"
                placeholder="Min. 8 caractères"
              />
            </div>
            <div>
              <label htmlFor="confirm-pwd" className="form-label">Confirmer le mot de passe</label>
              <input
                id="confirm-pwd"
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="form-input"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Sauvegarder le mot de passe
            </Button>
          </div>
        </form>
      </Card>

      {/* Preferences */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Sliders size={16} className="text-emerald-600" />
          </div>
          <p className="section-title mb-0">Préférences de la plateforme</p>
        </div>

        {prefSuccess && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 mb-4 text-sm">
            <CheckCircle size={15} />
            Préférences sauvegardées avec succès !
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="default-model" className="form-label">Modèle d'extraction par défaut</label>
            <select
              id="default-model"
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="form-input"
            >
              {MODELS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1.5">
              Ce modèle sera présélectionné à chaque nouvelle extraction.
            </p>
          </div>

          <div>
            <label htmlFor="language" className="form-label">Langue de l'interface</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-input"
            >
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button variant="primary" size="md" onClick={handlePrefSave}>
            Sauvegarder les préférences
          </Button>
        </div>
      </Card>
    </div>
  )
}
