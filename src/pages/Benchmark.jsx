import { useState, useCallback } from 'react'
import { PlayCircle, Download, Info, CheckSquare, Square } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { FileUploader } from '../components/extraction/FileUploader'
import { BenchmarkTable } from '../components/benchmark/BenchmarkTable'
import { BenchmarkChart } from '../components/benchmark/BenchmarkChart'
import { benchmarkResults, benchmarkChartData, speedComparisonData } from '../mock/benchmarks'

const ALL_MODELS = ['Docling', 'MinerU', 'PaddleOCR']

const MODEL_COLORS = {
  Docling:    'text-primary-700',
  MinerU:     'text-amber-600',
  PaddleOCR: 'text-emerald-600',
}

export default function Benchmark() {
  const [files, setFiles]           = useState([])
  const [selectedModels, setSelectedModels] = useState(['Docling', 'MinerU'])
  const [progresses, setProgresses] = useState({})
  const [status, setStatus]         = useState('idle') // idle | running | done
  const [results, setResults]       = useState(null)

  const toggleModel = (m) => {
    setSelectedModels((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    )
  }

  const runBenchmark = useCallback(async () => {
    if (!files.length || !selectedModels.length) return
    setStatus('running')
    setProgresses(Object.fromEntries(selectedModels.map((m) => [m, 0])))
    setResults(null)

    // Stagger each model
    const durations = { Docling: 5000, MinerU: 4500, PaddleOCR: 6000 }

    await Promise.all(
      selectedModels.map(async (model) => {
        const total = durations[model] || 5000
        const steps = 40
        const interval = total / steps
        for (let i = 1; i <= steps; i++) {
          await new Promise((r) => setTimeout(r, interval))
          setProgresses((p) => ({ ...p, [model]: Math.round((i / steps) * 100) }))
        }
      })
    )

    const filteredResults = benchmarkResults.filter((r) =>
      selectedModels.includes(r.model)
    )
    setResults(filteredResults)
    setStatus('done')
  }, [files, selectedModels])

  const handleExport = () => {
    alert('Export des résultats simulé — disponible via l\'API backend.')
  }

  const handleReset = () => {
    setFiles([])
    setSelectedModels(['Docling', 'MinerU'])
    setProgresses({})
    setStatus('idle')
    setResults(null)
  }

  return (
    <div className="page-container max-w-6xl mx-auto space-y-6">
      {/* Info banner */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
        <Info size={16} className="text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-700">
          Le benchmark compare plusieurs modèles sur les mêmes fichiers PDF et mesure précision,
          vitesse et nombre de tableaux extraits.
        </p>
      </div>

      {/* Config panel */}
      {status === 'idle' && (
        <>
          <Card>
            <p className="section-title">1. Importer des fichiers PDF</p>
            <FileUploader file={files} onFileSelect={setFiles} multiple />
          </Card>

          <Card>
            <p className="section-title">2. Sélectionner les modèles à comparer</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ALL_MODELS.map((m) => {
                const active = selectedModels.includes(m)
                return (
                  <button
                    key={m}
                    onClick={() => toggleModel(m)}
                    className={`
                      flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200
                      ${active
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                    `}
                  >
                    {active
                      ? <CheckSquare size={18} className="text-primary-700 flex-shrink-0" />
                      : <Square size={18} className="text-gray-300 flex-shrink-0" />
                    }
                    <span className={`font-semibold text-sm ${active ? MODEL_COLORS[m] : 'text-gray-500'}`}>
                      {m}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              variant="accent"
              size="lg"
              disabled={!files.length || !selectedModels.length}
              onClick={runBenchmark}
            >
              <PlayCircle size={18} />
              Lancer le benchmark
            </Button>
          </div>
        </>
      )}

      {/* Progress */}
      {status === 'running' && (
        <Card>
          <p className="section-title">Benchmark en cours…</p>
          <div className="space-y-5">
            {selectedModels.map((m) => (
              <div key={m}>
                <ProgressBar
                  label={m}
                  value={progresses[m] || 0}
                  color={m === 'Docling' ? 'primary' : m === 'MinerU' ? 'accent' : 'success'}
                  size="md"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Results */}
      {status === 'done' && results && (
        <>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="section-title mb-0">Résultats du benchmark</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleReset}>
                  Nouveau benchmark
                </Button>
                <Button variant="primary" size="sm" onClick={handleExport}>
                  <Download size={13} />
                  Exporter les résultats
                </Button>
              </div>
            </div>
            <BenchmarkTable results={results} />
          </Card>

          <Card>
            <p className="section-title">Visualisation comparative</p>
            <BenchmarkChart speedData={speedComparisonData} tableData={benchmarkChartData} />
          </Card>
        </>
      )}
    </div>
  )
}
