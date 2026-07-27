import { FileText, Table2, Clock, AlignLeft, Download, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

export function ExtractionResult({ result, onReset }) {
  const handleDownload = async () => {
    if (!result.jobId) {
      alert('ID de tâche manquant')
      return
    }
    try {
      const res = await fetch(`/api/result/${result.jobId}`)
      if (!res.ok) throw new Error('Erreur HTTP')
      const data = await res.json()
      
      const blob = new Blob([JSON.stringify(data.result, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${result.filename.split('.')[0]}_${result.model}_result.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('Erreur lors du téléchargement : ' + e.message)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: 'Pages analysées', value: result.pages },
          { icon: Table2,   label: 'Tableaux trouvés', value: result.tables },
          { icon: AlignLeft,label: 'Mots extraits',    value: result.words.toLocaleString('fr-FR') },
          { icon: Clock,    label: 'Durée totale',     value: result.duration },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-primary-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-primary-700" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-base font-bold text-primary-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header + model badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-800">Résultat — {result.filename}</h3>
          <Badge label={result.model} variant="info" />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onReset}>
            <RotateCcw size={13} />
            Nouvelle extraction
          </Button>
          <Button variant="primary" size="sm" onClick={handleDownload}>
            <Download size={13} />
            Télécharger
          </Button>
        </div>
      </div>

      {/* Text preview */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Aperçu du texte extrait
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-52 overflow-y-auto">
          <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
            {result.text}
          </pre>
        </div>
      </div>

      {/* Extracted tables */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Tableaux extraits ({result.extractedTables.length})
        </p>
        <div className="space-y-5">
          {result.extractedTables.map((tbl, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary-800 px-4 py-2.5 flex items-center gap-2">
                <Table2 size={13} className="text-blue-200" />
                <p className="text-xs font-medium text-white">{tbl.title}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-primary-50">
                      {tbl.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-primary-800 border-b border-primary-100 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tbl.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50 transition-colors">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-2 text-gray-700 border-b border-gray-50 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
