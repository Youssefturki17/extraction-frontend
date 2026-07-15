const MODELS = [
  {
    id: 'Docling',
    label: 'Docling',
    badge: 'Recommandé',
    description: 'Extraction structurée haute précision. Optimisé pour les rapports financiers.',
    precision: '94.7%',
    speed: 'Rapide',
  },
  {
    id: 'MinerU',
    label: 'MinerU',
    badge: 'Équilibré',
    description: 'Bon équilibre vitesse / précision. Idéal pour les bilans et tableaux complexes.',
    precision: '92.3%',
    speed: 'Très rapide',
  },
  {
    id: 'PaddleOCR',
    label: 'PaddleOCR',
    badge: 'OCR',
    description: 'Basé sur la reconnaissance optique. Adapté aux documents scannés.',
    precision: '88.6%',
    speed: 'Modéré',
  },
]

const BADGE_COLOR = {
  Recommandé: 'bg-accent/10 text-accent-dark border-accent/30',
  Équilibré:  'bg-blue-50 text-blue-700 border-blue-200',
  OCR:        'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export function ModelSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {MODELS.map((m) => {
        const selected = value === m.id
        return (
          <label
            key={m.id}
            className={`
              relative flex flex-col gap-2 p-4 rounded-2xl border-2 cursor-pointer
              transition-all duration-200
              ${selected
                ? 'border-primary-600 bg-primary-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
              }
            `}
          >
            <input
              type="radio"
              name="model"
              value={m.id}
              checked={selected}
              onChange={() => onChange(m.id)}
              className="sr-only"
            />
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${selected ? 'text-primary-800' : 'text-gray-700'}`}>
                {m.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_COLOR[m.badge]}`}>
                {m.badge}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
            <div className="flex gap-3 mt-1">
              <div className="text-xs">
                <span className="text-gray-400">Précision : </span>
                <span className="font-semibold text-primary-700">{m.precision}</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-400">Vitesse : </span>
                <span className="font-semibold text-gray-700">{m.speed}</span>
              </div>
            </div>

            {/* Selected indicator */}
            {selected && (
              <div className="absolute top-3 right-3 w-4 h-4 bg-primary-700 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </label>
        )
      })}
    </div>
  )
}
