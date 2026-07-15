import { ProgressBar } from '../ui/ProgressBar'
import { Loader2 } from 'lucide-react'

const STEPS = [
  { label: 'Chargement du fichier',    threshold: 15 },
  { label: 'Analyse de la structure',  threshold: 40 },
  { label: 'Extraction des tableaux',  threshold: 70 },
  { label: 'Post-traitement NLP',      threshold: 90 },
  { label: 'Finalisation',             threshold: 100 },
]

export function ExtractionProgress({ progress, model }) {
  const currentStep = STEPS.find((s) => progress < s.threshold) || STEPS[STEPS.length - 1]

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center gap-3">
        <Loader2 size={20} className="text-primary-700 animate-spin" />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Extraction en cours avec <span className="text-primary-700">{model}</span>…
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{currentStep.label}</p>
        </div>
      </div>

      <ProgressBar value={progress} size="lg" color="primary" />

      {/* Steps visual */}
      <div className="flex justify-between">
        {STEPS.map((step, i) => {
          const done = progress >= step.threshold
          const active = currentStep.label === step.label
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${done ? 'bg-primary-700 scale-125' : active ? 'bg-primary-400 animate-pulse' : 'bg-gray-200'}
                `}
              />
              <p className="text-xs text-gray-400 text-center hidden md:block" style={{ fontSize: '10px' }}>
                {step.label.split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
