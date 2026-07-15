export const dashboardStats = {
  totalExtractions: 247,
  totalTables: 1834,
  avgDuration: '2m 34s',
  successRate: 96.3,
}

export const extractionsPerDay = [
  { date: '08 Juil', extractions: 28, succès: 27, erreurs: 1 },
  { date: '09 Juil', extractions: 35, succès: 34, erreurs: 1 },
  { date: '10 Juil', extractions: 31, succès: 29, erreurs: 2 },
  { date: '11 Juil', extractions: 42, succès: 41, erreurs: 1 },
  { date: '12 Juil', extractions: 38, succès: 36, erreurs: 2 },
  { date: '13 Juil', extractions: 45, succès: 44, erreurs: 1 },
  { date: '14 Juil', extractions: 28, succès: 27, erreurs: 1 },
]

export const modelPerformanceData = [
  { model: 'Docling',    avgTables: 14.2, avgDuration: 138, précision: 94.7, extractions: 112 },
  { model: 'MinerU',     avgTables: 12.8, avgDuration: 125, précision: 92.3, extractions:  89 },
  { model: 'PaddleOCR', avgTables: 11.4, avgDuration: 192, précision: 88.6, extractions:  46 },
]

export const modelComparisonChart = [
  { name: 'Docling',    tables: 14.2, vitesse: 72,  précision: 94.7 },
  { name: 'MinerU',     tables: 12.8, vitesse: 80,  précision: 92.3 },
  { name: 'PaddleOCR', tables: 11.4, vitesse: 52,  précision: 88.6 },
]

export const statCards = [
  {
    id: 'total-extractions',
    label: 'Total Extractions',
    value: '247',
    change: '+12%',
    changeDir: 'up',
    icon: 'FileText',
    color: 'blue',
  },
  {
    id: 'total-tables',
    label: 'Tableaux Extraits',
    value: '1 834',
    change: '+8%',
    changeDir: 'up',
    icon: 'Table2',
    color: 'indigo',
  },
  {
    id: 'avg-duration',
    label: 'Temps Moyen',
    value: '2m 34s',
    change: '-5%',
    changeDir: 'down',
    icon: 'Clock',
    color: 'amber',
  },
  {
    id: 'success-rate',
    label: 'Taux de Succès',
    value: '96.3%',
    change: '+1.2%',
    changeDir: 'up',
    icon: 'CheckCircle',
    color: 'green',
  },
]
