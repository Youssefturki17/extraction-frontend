import { Badge } from '../ui/Badge'

const PRECISION_COLOR = (p) => {
  if (p >= 93) return 'text-emerald-600 font-semibold'
  if (p >= 90) return 'text-amber-600 font-semibold'
  return 'text-red-500 font-semibold'
}

const MODEL_COLORS = {
  Docling:    'bg-primary-800',
  MinerU:     'bg-accent',
  PaddleOCR: 'bg-emerald-500',
}

export function BenchmarkTable({ results }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Modèle', 'Tables moy.', 'Mots moy.', 'Durée moy.', 'Précision estimée', 'Statut'].map((h) => (
              <th key={h} className="table-th whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.model} className="table-row">
              <td className="table-td">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${MODEL_COLORS[r.model] || 'bg-gray-400'}`} />
                  <span className="font-medium text-gray-800">{r.model}</span>
                </div>
              </td>
              <td className="table-td font-medium">{r.avgTables.toFixed(1)}</td>
              <td className="table-td">{r.avgWords.toLocaleString('fr-FR')}</td>
              <td className="table-td">{r.avgDuration}</td>
              <td className={`table-td ${PRECISION_COLOR(r.precision)}`}>{r.precision}%</td>
              <td className="table-td">
                <Badge label="Terminé" variant="succès" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
