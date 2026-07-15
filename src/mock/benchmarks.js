export const benchmarkFiles = [
  'rapport_fonds_opcvm_2024.pdf',
  'bilan_financier_q3_2024.pdf',
  'prospectus_obligations_2024.pdf',
  'note_information_fcp_maroc.pdf',
  'rapport_annuel_bnp_2023.pdf',
]

export const benchmarkResults = [
  {
    model: 'Docling',
    color: '#1a237e',
    avgTables: 14.2,
    avgWords: 8640,
    avgDuration: '2m 18s',
    avgDurationSec: 138,
    precision: 94.7,
    files: [
      { file: 'rapport_fonds_opcvm_2024.pdf',    tables: 14, words: 8420,  duration: '2m 18s', precision: 95.1 },
      { file: 'bilan_financier_q3_2024.pdf',     tables: 10, words: 5340,  duration: '1m 47s', precision: 94.2 },
      { file: 'prospectus_obligations_2024.pdf', tables: 13, words: 12800, duration: '3m 05s', precision: 93.8 },
      { file: 'note_information_fcp_maroc.pdf',  tables: 11, words: 7650,  duration: '2m 05s', precision: 95.5 },
      { file: 'rapport_annuel_bnp_2023.pdf',     tables: 23, words: 18900, duration: '4m 31s', precision: 95.0 },
    ],
  },
  {
    model: 'MinerU',
    color: '#F0A500',
    avgTables: 12.8,
    avgWords: 9120,
    avgDuration: '2m 05s',
    avgDurationSec: 125,
    precision: 92.3,
    files: [
      { file: 'rapport_fonds_opcvm_2024.pdf',    tables: 12, words: 8100,  duration: '2m 05s', precision: 92.8 },
      { file: 'bilan_financier_q3_2024.pdf',     tables: 9,  words: 5100,  duration: '1m 38s', precision: 91.5 },
      { file: 'prospectus_obligations_2024.pdf', tables: 11, words: 12400, duration: '2m 50s', precision: 91.9 },
      { file: 'note_information_fcp_maroc.pdf',  tables: 10, words: 7200,  duration: '1m 55s', precision: 93.1 },
      { file: 'rapport_annuel_bnp_2023.pdf',     tables: 22, words: 18500, duration: '4m 05s', precision: 92.2 },
    ],
  },
  {
    model: 'PaddleOCR',
    color: '#10b981',
    avgTables: 11.4,
    avgWords: 7890,
    avgDuration: '3m 12s',
    avgDurationSec: 192,
    precision: 88.6,
    files: [
      { file: 'rapport_fonds_opcvm_2024.pdf',    tables: 11, words: 7800,  duration: '3m 00s', precision: 88.9 },
      { file: 'bilan_financier_q3_2024.pdf',     tables: 8,  words: 4900,  duration: '2m 20s', precision: 87.4 },
      { file: 'prospectus_obligations_2024.pdf', tables: 10, words: 11200, duration: '4m 10s', precision: 88.1 },
      { file: 'note_information_fcp_maroc.pdf',  tables: 9,  words: 6900,  duration: '2m 50s', precision: 89.2 },
      { file: 'rapport_annuel_bnp_2023.pdf',     tables: 19, words: 17200, duration: '5m 42s', precision: 89.4 },
    ],
  },
]

export const benchmarkChartData = [
  { name: 'Tables moy.', Docling: 14.2, MinerU: 12.8, PaddleOCR: 11.4 },
  { name: 'Précision %', Docling: 94.7, MinerU: 92.3, PaddleOCR: 88.6 },
  { name: 'Vitesse (inv)', Docling: 72, MinerU: 80, PaddleOCR: 52 },
]

export const speedComparisonData = [
  { name: 'rapport_opcvm', Docling: 138, MinerU: 125, PaddleOCR: 180 },
  { name: 'bilan_q3',      Docling: 107, MinerU:  98, PaddleOCR: 140 },
  { name: 'prospectus',    Docling: 185, MinerU: 170, PaddleOCR: 250 },
  { name: 'note_fcp',      Docling: 125, MinerU: 115, PaddleOCR: 170 },
  { name: 'rapport_bnp',   Docling: 271, MinerU: 245, PaddleOCR: 342 },
]
