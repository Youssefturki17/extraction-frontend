import { useState, useCallback, useRef } from 'react'

// URL de base de l'API (via le proxy Vite /api → http://localhost:5000)
const API_BASE = '/api'

// Durée maximale de polling : 20 minutes (les gros PDFs peuvent prendre du temps)
const MAX_POLL_MS = 20 * 60 * 1000
// Intervalle entre chaque poll
const POLL_INTERVAL_MS = 3000

/**
 * Estime la progression (0-99) en fonction du temps écoulé en millisecondes.
 * Le vrai 100% n'est atteint que quand le backend répond "done".
 */
function estimateProgress(elapsedMs) {
  const sec = elapsedMs / 1000
  if (sec < 30)   return Math.round((sec / 30) * 15)           // 0→15% en 30s
  if (sec < 120)  return Math.round(15 + ((sec - 30) / 90) * 25)   // 15→40% en 90s
  if (sec < 300)  return Math.round(40 + ((sec - 120) / 180) * 30) // 40→70% en 3min
  if (sec < 600)  return Math.round(70 + ((sec - 300) / 300) * 20) // 70→90% en 5min
  return 90 + Math.min(9, Math.round(((sec - 600) / 600) * 9))     // 90→99% ensuite
}

/**
 * Convertit un tableau de la forme { "col1": {0: v, 1: v}, "col2": {...} }
 * (format pandas .to_dict()) en { title, headers, rows }.
 */
function parsePandasTable(tableDict, index, pageNum) {
  if (!tableDict || typeof tableDict !== 'object') return null
  const headers = Object.keys(tableDict)
  if (headers.length === 0) return null
  const firstCol = tableDict[headers[0]]
  const rowIndices = Object.keys(firstCol || {})
  const rows = rowIndices.map((ri) =>
    headers.map((h) => {
      const val = tableDict[h][ri]
      return val === null || val === undefined ? '' : String(val)
    })
  )
  return {
    title: `Tableau ${index + 1}${pageNum != null ? ` — Page ${pageNum}` : ''}`,
    headers,
    rows,
  }
}

/**
 * Transforme la réponse brute du backend en objet attendu par ExtractionResult.
 */
function mapApiResult(data, filename, modelLabel, jobId) {
  const raw = data.result ?? data

  // Construction des tableaux à partir de tableaux_par_page
  const extractedTables = []
  const tableauxParPage = raw.tableaux_par_page ?? []
  tableauxParPage.forEach((pageEntry) => {
    const pageNum = pageEntry.page
    const tableaux = pageEntry.tableaux ?? []
    tableaux.forEach((tbl, i) => {
      const parsed = parsePandasTable(tbl, extractedTables.length, pageNum)
      if (parsed) extractedTables.push(parsed)
    })
  })

  // Fallback : tables plates si tableaux_par_page est vide
  if (extractedTables.length === 0) {
    const flatTables = raw.tables ?? []
    flatTables.forEach((tbl, i) => {
      const parsed = parsePandasTable(tbl, i, null)
      if (parsed) extractedTables.push(parsed)
    })
  }

  const durationSec = raw.duration_seconds ?? 0
  const minutes = Math.floor(durationSec / 60)
  const seconds = Math.round(durationSec % 60)
  const durationLabel = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

  const text = raw.text ?? ''
  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0

  return {
    jobId,
    filename,
    model: modelLabel,
    pages: raw.nb_pages ?? '—',
    tables: raw.nb_tableaux ?? extractedTables.length,
    words: wordCount,
    duration: durationLabel,
    text: text.slice(0, 4000) + (text.length > 4000 ? '\n\n[…texte tronqué pour l\'aperçu…]' : ''),
    extractedTables,
  }
}

export function useExtraction() {
  const [file, setFile]       = useState(null)
  const [model, setModel]     = useState('Docling')
  const [progress, setProgress] = useState(0)
  const [status, setStatus]   = useState('idle') // idle | running | done | error
  const [result, setResult]   = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Référence pour pouvoir annuler le polling
  const pollTimerRef = useRef(null)
  const startTimeRef = useRef(null)

  const startExtraction = useCallback(async () => {
    if (!file) return
    setStatus('running')
    setProgress(0)
    setResult(null)
    setErrorMsg(null)
    startTimeRef.current = Date.now()

    // ── Étape 1 : Upload du fichier ────────────────────────────────────────
    let jobId
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model', model.toLowerCase())

      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}))
        throw new Error(errData.error ?? `Erreur HTTP ${uploadRes.status} lors de l'upload`)
      }

      const uploadData = await uploadRes.json()
      jobId = uploadData.job_id
      if (!jobId) throw new Error('Aucun job_id reçu du serveur')
    } catch (err) {
      setStatus('error')
      setErrorMsg(`Échec de l'upload : ${err.message}`)
      return
    }

    // ── Étape 2 : Polling du statut ────────────────────────────────────────
    const poll = async () => {
      const elapsed = Date.now() - startTimeRef.current

      if (elapsed > MAX_POLL_MS) {
        setStatus('error')
        setErrorMsg(
          `Délai d'attente dépassé (${MAX_POLL_MS / 60000} min). ` +
          'Le traitement est peut-être encore en cours côté serveur. ' +
          'Vérifiez l\'historique dans quelques minutes.'
        )
        return
      }

      // Mise à jour de la progression estimée
      setProgress(estimateProgress(elapsed))

      try {
        const statusRes = await fetch(`${API_BASE}/status/${jobId}`)
        if (!statusRes.ok) {
          // Erreur réseau passagère : on réessaie
          pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS)
          return
        }
        const statusData = await statusRes.json()

        if (statusData.status === 'done') {
          // ── Étape 3 : Récupération du résultat ──────────────────────────
          try {
            const resultRes = await fetch(`${API_BASE}/result/${jobId}`)
            const resultData = await resultRes.json()
            const mapped = mapApiResult(resultData, file.name, model, jobId)
            setProgress(100)
            setResult(mapped)
            setStatus('done')
          } catch (err) {
            setStatus('error')
            setErrorMsg(`Résultat non disponible : ${err.message}`)
          }
        } else if (statusData.status === 'error') {
          setStatus('error')
          setErrorMsg(statusData.message ?? 'Le traitement a échoué côté serveur.')
        } else {
          // Encore en cours → on repoll
          pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS)
        }
      } catch {
        // Erreur réseau : on réessaie
        pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS)
      }
    }

    // Démarrage du premier poll après un court délai
    pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS)
  }, [file, model])

  const reset = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current)
      pollTimerRef.current = null
    }
    setFile(null)
    setProgress(0)
    setStatus('idle')
    setResult(null)
    setErrorMsg(null)
  }, [])

  return {
    file, setFile,
    model, setModel,
    progress, status,
    result, errorMsg,
    startExtraction, reset,
  }
}
