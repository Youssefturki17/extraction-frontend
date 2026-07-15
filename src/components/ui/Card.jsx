export function Card({ children, className = '', padding = true }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-gray-100 ${padding ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
