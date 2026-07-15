import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'

function ProtectedRoute() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Layout />
}

function PublicRoute() {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return <Outlet />
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login      from './pages/Login'
import Dashboard  from './pages/Dashboard'
import Extraction from './pages/Extraction'
import History    from './pages/History'
import Benchmark  from './pages/Benchmark'
import Settings   from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/extraction" element={<Extraction />} />
            <Route path="/history"    element={<History />} />
            <Route path="/benchmark"  element={<Benchmark />} />
            <Route path="/settings"   element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
