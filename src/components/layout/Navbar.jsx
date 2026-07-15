import { useLocation } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const PAGE_TITLES = {
  '/dashboard':  'Tableau de bord',
  '/extraction': 'Extraction de Documents',
  '/history':    'Historique des Extractions',
  '/benchmark':  'Benchmark des Modèles',
  '/settings':   'Paramètres',
}

export function Navbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()

  const title = PAGE_TITLES[pathname] || 'FinInfo Platform'

  return (
    <header className="h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 flex-shrink-0">
      {/* Left — page title */}
      <div>
        <h1 className="text-base font-semibold text-gray-800">{title}</h1>
        <p className="text-xs text-gray-400">FinInfo Extraction Platform</p>
      </div>

      {/* Right — search + notifications + user */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* User chip */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar || 'TY'}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-400 leading-tight">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
