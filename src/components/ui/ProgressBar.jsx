export function ProgressBar({ value = 0, label, showPercent = true, color = 'primary', size = 'md' }) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const colors = {
    primary: 'bg-primary-700',
    accent:  'bg-accent',
    success: 'bg-emerald-500',
    danger:  'bg-red-500',
  }

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showPercent && (
            <span className="text-xs font-semibold text-primary-700">{value}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-300 ease-out ${colors[color]}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
