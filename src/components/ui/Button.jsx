const variants = {
  primary:   'bg-primary-800 hover:bg-primary-700 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-white hover:bg-gray-50 text-primary-800 border border-primary-200 hover:border-primary-400',
  danger:    'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-600',
  accent:    'bg-accent hover:bg-accent-dark text-white shadow-sm hover:shadow-md',
}

const sizes = {
  sm:  'px-3 py-1.5 text-xs',
  md:  'px-4 py-2.5 text-sm',
  lg:  'px-6 py-3 text-sm font-semibold',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-200 active:scale-95 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
