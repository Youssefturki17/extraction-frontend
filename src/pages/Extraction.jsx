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
    result,
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

      {/* Results */}
      {status === 'done' && result && (
        <Card>
          <ExtractionResult result={result} onReset={reset} />
        </Card>
      )}
    </div>
  )
}
