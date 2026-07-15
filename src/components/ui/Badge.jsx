const variants = {
  succès:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
  erreur:      'bg-red-50 text-red-700 border border-red-200',
  processing:  'bg-amber-50 text-amber-700 border border-amber-200',
  info:        'bg-blue-50 text-primary-700 border border-blue-200',
  neutral:     'bg-gray-100 text-gray-600 border border-gray-200',
}

const dots = {
  succès:     'bg-emerald-500',
  erreur:     'bg-red-500',
  processing: 'bg-amber-500',
  info:       'bg-primary-500',
  neutral:    'bg-gray-400',
}

export function Badge({ label, variant = 'neutral', dot = true, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.neutral} ${className}`}
    >
      {dot && (
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dots[variant] || dots.neutral}`} />
      )}
      {label}
    </span>
  )
}
