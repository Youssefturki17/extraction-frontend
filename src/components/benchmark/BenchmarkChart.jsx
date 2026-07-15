import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'

const MODEL_COLORS = {
  Docling:    '#1a237e',
  MinerU:     '#F0A500',
  PaddleOCR: '#10b981',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-card p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-gray-500">{p.dataKey} :</span>
          <span className="font-medium text-gray-800">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function BenchmarkChart({ speedData, tableData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Speed comparison */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Durée d'extraction par fichier (secondes)
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={speedData} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              unit="s"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconType="circle"
              iconSize={8}
            />
            {Object.entries(MODEL_COLORS).map(([model, color]) => (
              <Bar key={model} dataKey={model} fill={color} radius={[4, 4, 0, 0]} maxBarSize={20} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables comparison */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Indicateurs comparatifs (normalisés)
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={tableData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Radar name="Docling"    dataKey="Docling"    stroke="#1a237e" fill="#1a237e" fillOpacity={0.15} strokeWidth={2} />
            <Radar name="MinerU"     dataKey="MinerU"     stroke="#F0A500" fill="#F0A500" fillOpacity={0.10} strokeWidth={2} />
            <Radar name="PaddleOCR" dataKey="PaddleOCR" stroke="#10b981" fill="#10b981" fillOpacity={0.10} strokeWidth={2} />
            <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
