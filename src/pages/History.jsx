import { useState, useMemo } from 'react'
import { FileText, Search, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Table, Tr, Td } from '../components/ui/Table'
import { extractions } from '../mock/extractions'

const PAGE_SIZE = 10

const MODELS  = ['Tous', 'Docling', 'MinerU', 'PaddleOCR']
const STATUSES = ['Tous', 'succès', 'erreur']

export default function History() {
  const [search, setSearch]         = useState('')
  const [modelFilter, setModelFilter] = useState('Tous')
  const [statusFilter, setStatusFilter] = useState('Tous')
  const [page, setPage]             = useState(1)

  const filtered = useMemo(() => {
    return extractions.filter((ex) => {
      const matchSearch = ex.filename.toLowerCase().includes(search.toLowerCase())
      const matchModel  = modelFilter === 'Tous' || ex.model === modelFilter
      const matchStatus = statusFilter === 'Tous' || ex.status === statusFilter
      return matchSearch && matchModel && matchStatus
    })
  }, [search, modelFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleExport = () => {
    alert('Export CSV simulé — la fonctionnalité sera connectée à l\'API backend.')
  }

  const handleFilter = (setter) => (e) => {
    setter(e.target.value)
    setPage(1)
  }

  return (
    <div className="page-container max-w-7xl mx-auto space-y-5">
      {/* Toolbar */}
      <Card>
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center flex-1">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un fichier…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="form-input pl-9 w-56"
              />
            </div>

            {/* Model filter */}
            <select
              value={modelFilter}
              onChange={handleFilter(setModelFilter)}
              className="form-input w-36"
              aria-label="Filtrer par modèle"
            >
              {MODELS.map((m) => <option key={m}>{m}</option>)}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={handleFilter(setStatusFilter)}
              className="form-input w-36"
              aria-label="Filtrer par statut"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>

            <span className="text-xs text-gray-400">
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={13} />
            Exporter CSV
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <Table
          headers={['Fichier', 'Modèle', 'Tableaux', 'Mots', 'Durée', 'Statut', 'Date']}
        >
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-12 text-sm text-gray-400">
                Aucune extraction ne correspond aux filtres sélectionnés.
              </td>
            </tr>
          ) : (
            paginated.map((ex) => (
              <Tr key={ex.id}>
                <Td>
                  <div className="flex items-center gap-2">
                    <FileText size={13} className="text-primary-300 flex-shrink-0" />
                    <span className="font-medium text-gray-800 truncate max-w-xs text-xs">
                      {ex.filename}
                    </span>
                  </div>
                </Td>
                <Td>
                  <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg">
                    {ex.model}
                  </span>
                </Td>
                <Td className="font-semibold text-center">{ex.tables}</Td>
                <Td>{ex.words.toLocaleString('fr-FR')}</Td>
                <Td className="text-gray-500">{ex.duration}</Td>
                <Td><Badge label={ex.status} variant={ex.status} /></Td>
                <Td className="text-gray-400 text-xs whitespace-nowrap">{ex.date}</Td>
              </Tr>
            ))
          )}
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              Page {page} sur {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} className="text-gray-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                    p === page
                      ? 'bg-primary-800 text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
