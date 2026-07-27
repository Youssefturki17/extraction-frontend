import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { FileUploader } from '../components/extraction/FileUploader'
import { ModelSelector } from '../components/extraction/ModelSelector'
import { ExtractionProgress } from '../components/extraction/ExtractionProgress'
import { ExtractionResult } from '../components/extraction/ExtractionResult'
import { useExtraction } from '../hooks/useExtraction'
import { PlayCircle, Info } from 'lucide-react'

export default function Extraction() {
  const {
    file, setFile,
    model, setModel,
    progress, status,
    result, errorMsg,
    startExtraction,
    reset,
  } = useExtraction()

  const canStart = !!file && status === 'idle'

  return (
    <div className="page-container max-w-5xl mx-auto space-y-6">
      {/* Intro banner */}
      <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-2xl px-5 py-4">
        <Info size={16} className="text-primary-600 flex-shrink-0" />
        <p className="text-sm text-primary-700">
          Sélectionnez un fichier PDF, choisissez le modèle d'extraction, puis lancez l'analyse.
          Les résultats s'affichent automatiquement à la fin du traitement.
        </p>
      </div>

      {/* File upload */}
      {status === 'idle' && (
        <Card>
          <p className="section-title">1. Importer un document PDF</p>
          <FileUploader file={file} onFileSelect={setFile} />
        </Card>
      )}

      {/* Model selector */}
      {status === 'idle' && (
        <Card>
          <p className="section-title">2. Choisir le modèle d'extraction</p>
          <ModelSelector value={model} onChange={setModel} />
        </Card>
      )}

      {/* Launch button */}
      {status === 'idle' && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            disabled={!canStart}
            onClick={startExtraction}
          >
            <PlayCircle size={18} />
            Lancer l'extraction
          </Button>
        </div>
      )}

      {/* Progress */}
      {status === 'running' && (
        <Card>
          <ExtractionProgress progress={progress} model={model} />
        </Card>
      )}

      {/* Error */}
      {status === 'error' && (
        <Card>
          <div className="flex flex-col items-center py-6 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-xl font-bold">!</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Échec de l'extraction</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md">{errorMsg}</p>
            <Button variant="secondary" className="mt-4" onClick={reset}>
              Réessayer
            </Button>
          </div>
        </Card>
      )}

      {/* Results */}
      {status === 'done' && result && (
        <Card>
          <ExtractionResult result={result} onReset={reset} />
        </Card>
      )}
    </div>
  )
}
