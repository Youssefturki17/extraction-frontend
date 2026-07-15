import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { FileText, Table2, Clock, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Table, Tr, Td } from '../components/ui/Table'
import { dashboardStats, extractionsPerDay, modelComparisonChart } from '../mock/stats'
import { recentExtractions } from '../mock/extractions'

const STAT_CARDS = [
  {
    id: 'kpi-extractions',
    label: 'Total Extractions',
    value: dashboardStats.totalExtractions,
    change: '+12%',
    up: true,
    icon: FileText,
    gradient: 'from-primary-800 to-primary-600',
  },
  {
    id: 'kpi-tables',
    label: 'Tableaux Extraits',
    value: dashboardStats.totalTables.toLocaleString('fr-FR'),
    change: '+8%',
    up: true,
    icon: Table2,
    gradient: 'from-indigo-700 to-indigo-500',
  },
  {
    id: 'kpi-duration',
    label: 'Temps Moyen',
    value: dashboardStats.avgDuration,
    change: '-5%',
    up: false,
    icon: Clock,
    gradient: 'from-amber-600 to-amber-400',
  },
  {
    id: 'kpi-success',
    label: 'Taux de Succès',
    value: `${dashboardStats.successRate}%`,
    change: '+1.2%',
    up: true,
    icon: CheckCircle,
    gradient: 'from-emerald-600 to-emerald-400',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-card p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mt-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.stroke || p.fill }} />
          <span className="text-gray-500">{p.name} :</span>
          <span className="font-medium text-gray-800">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="page-container space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Bonjour, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Voici un aperçu de votre activité d'extraction
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-primary-50 border border-primary-100 px-4 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-primary-700">Plateforme opérationnelle</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ id, label, value, change, up, icon: Icon, gradient }) => (
          <div
            key={id}
            id={id}
            className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-xs font-medium">{label}</p>
                <p className="text-2xl font-extrabold mt-1 tracking-tight">{value}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-2">
                <Icon size={20} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="text-xs font-semibold">{change}</span>
              <span className="text-white/60 text-xs ml-1">vs mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Line chart */}
        <Card className="lg:col-span-2">
          <p className="section-title">Extractions par jour — 7 derniers jours</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={extractionsPerDay} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
              <Line
                type="monotone" dataKey="extractions" name="Total"
                stroke="#1a237e" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }}
              />
              <Line
                type="monotone" dataKey="succès" name="Succès"
                stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar chart */}
        <Card>
          <p className="section-title">Comparaison des modèles</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={modelComparisonChart} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="précision" name="Précision %" fill="#1a237e" radius={[0, 4, 4, 0]} maxBarSize={14} />
              <Bar dataKey="vitesse"   name="Vitesse"   fill="#F0A500"  radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent extractions */}
      <Card padding={false}>
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <p className="section-title mb-0">Extractions récentes</p>
          <a href="/history" className="text-xs text-primary-600 hover:text-primary-800 font-medium transition-colors">
            Voir tout →
          </a>
        </div>
        <div className="p-4">
          <Table
            headers={['Fichier', 'Modèle', 'Tables', 'Statut', 'Date']}
          >
            {recentExtractions.map((ex) => (
              <Tr key={ex.id}>
                <Td>
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-primary-400 flex-shrink-0" />
                    <span className="font-medium text-gray-800 truncate max-w-xs">{ex.filename}</span>
                  </div>
                </Td>
                <Td>
                  <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg">
                    {ex.model}
                  </span>
                </Td>
                <Td className="font-medium">{ex.tables}</Td>
                <Td><Badge label={ex.status} variant={ex.status} /></Td>
                <Td className="text-gray-400">{ex.date}</Td>
              </Tr>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  )
}
