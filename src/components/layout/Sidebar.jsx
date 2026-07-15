import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileSearch,
  History,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/dashboard',  label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/extraction', label: 'Extraction',       icon: FileSearch },
  { to: '/history',    label: 'Historique',       icon: History },
  { to: '/benchmark',  label: 'Benchmark',        icon: BarChart3 },
  { to: '/settings',   label: 'Paramètres',       icon: Settings },
]

export function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`
        relative flex flex-col h-full
        bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 bg-white border border-gray-200 rounded-full p-0.5 shadow-md hover:shadow-lg transition-shadow text-primary-800"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo / Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex-shrink-0 w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-md">
          <Zap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">FinInfo</p>
            <p className="text-blue-200 text-xs leading-tight">Extraction Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'} ${collapsed ? 'justify-center px-2' : ''}`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className={`border-t border-white/10 px-2 py-3 space-y-2`}>
        {/* Avatar + name */}
        <div className={`flex items-center gap-3 px-2 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar || 'TY'}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
              <p className="text-blue-300 text-xs truncate">{user?.role}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Déconnexion"
          className={`sidebar-link sidebar-link-inactive w-full text-red-300 hover:text-red-200 hover:bg-red-500/20 ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
