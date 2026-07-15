import { useCallback, useState } from 'react'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'

export function FileUploader({ file, onFileSelect, multiple = false }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const validate = (f) => {
    if (!f) return false
    if (f.type !== 'application/pdf') {
      setError('Seuls les fichiers PDF sont acceptés.')
      return false
    }
    if (f.size > 50 * 1024 * 1024) {
      setError('Fichier trop volumineux (max 50 Mo).')
      return false
    }
    setError('')
    return true
  }

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const dropped = multiple ? Array.from(e.dataTransfer.files) : e.dataTransfer.files[0]
      if (multiple) {
        const valid = dropped.filter(validate)
        if (valid.length) onFileSelect(valid)
      } else {
        if (validate(dropped)) onFileSelect(dropped)
      }
    },
    [multiple, onFileSelect]
  )

  const handleChange = (e) => {
    const selected = multiple
      ? Array.from(e.target.files)
      : e.target.files[0]
    if (multiple) {
      const valid = selected.filter(validate)
      if (valid.length) onFileSelect(valid)
    } else {
      if (validate(selected)) onFileSelect(selected)
    }
  }

  const hasFile = multiple ? file && file.length > 0 : !!file
  const fileList = multiple ? file || [] : file ? [file] : []

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer
          ${dragging
            ? 'border-primary-500 bg-primary-50'
            : hasFile
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-gray-200 bg-gray-50 hover:border-primary-400 hover:bg-blue-50'
          }
        `}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,application/pdf"
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />

        {hasFile ? (
          <div className="space-y-2">
            <FileText size={36} className="mx-auto text-emerald-500" />
            {fileList.map((f, i) => (
              <p key={i} className="text-sm font-medium text-emerald-700">
                {f.name}
                <span className="ml-2 text-emerald-500 font-normal">
                  ({(f.size / 1024).toFixed(0)} Ko)
                </span>
              </p>
            ))}
            <p className="text-xs text-emerald-500 mt-1">
              Cliquez pour changer {multiple ? 'les fichiers' : 'le fichier'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload
              size={36}
              className={`mx-auto ${dragging ? 'text-primary-500' : 'text-gray-300'} transition-colors`}
            />
            <div>
              <p className="text-sm font-medium text-gray-600">
                Glissez-déposez {multiple ? 'vos fichiers PDF' : 'votre fichier PDF'} ici
              </p>
              <p className="text-xs text-gray-400 mt-1">ou cliquez pour sélectionner (max 50 Mo)</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle size={14} className="flex-shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}

      {hasFile && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFileSelect(multiple ? [] : null)
            setError('')
          }}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={12} />
          Supprimer {multiple ? 'les fichiers' : 'le fichier'}
        </button>
      )}
    </div>
  )
}
