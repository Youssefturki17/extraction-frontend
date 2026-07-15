import { useState, useCallback } from 'react'

const MOCK_EXTRACTED_TEXT = `
RAPPORT DE GESTION — FONDS OPCVM MIXTE MAROC CROISSANCE
Exercice clos le 31 décembre 2023

1. PRÉSENTATION DU FONDS
Le fonds Maroc Croissance est un OPCVM mixte de droit marocain agréé par l'AMMC le 15 mars 2018. 
Il est géré par FinInfo Asset Management SA, société de gestion agréée par l'AMMC sous le numéro SG/2017/004.

2. POLITIQUE D'INVESTISSEMENT
Le fonds investit principalement dans des titres de capital et des titres de créance émis par des entreprises 
marocaines cotées à la Bourse des Valeurs de Casablanca (BVC). La répartition stratégique est la suivante :
— Actions cotées BVC : 60% à 75% de l'actif net
— Obligations et bons du Trésor : 20% à 35% de l'actif net
— Liquidités et équivalents : 0% à 10% de l'actif net

3. PERFORMANCE ET RÉSULTATS
Au cours de l'exercice 2023, le fonds a enregistré une performance nette de +8,34%, surperformant son 
indice de référence composite (MASI 60% / MGBX 40%) de +2,18 points de pourcentage.

La valeur liquidative par part est passée de 1 247,83 MAD au 31/12/2022 à 1 351,95 MAD au 31/12/2023.
L'actif net total du fonds s'établit à 2 845 342 000 MAD au 31 décembre 2023.

4. PRINCIPAUX RISQUES
4.1 Risque de marché : exposition aux fluctuations du marché boursier marocain
4.2 Risque de liquidité : certaines lignes actions présentent des volumes d'échange limités
4.3 Risque de taux : impact des variations de taux directeur de Bank Al-Maghrib sur le portefeuille obligataire
4.4 Risque de change : le fonds est libellé en MAD, sans exposition aux devises étrangères

5. COMPOSITION DU PORTEFEUILLE AU 31/12/2023
Le portefeuille comprend 47 lignes d'investissement réparties dans 12 secteurs d'activité.
Les cinq premières positions représentent 38,2% de l'actif net total.
`

const MOCK_TABLES = [
  {
    title: 'Tableau 1 — Indicateurs de performance 2023',
    headers: ['Indicateur', 'Valeur', 'Benchmark', 'Écart'],
    rows: [
      ['Performance nette annuelle', '+8,34%', '+6,16%', '+2,18%'],
      ['Volatilité annualisée', '7,42%', '8,10%', '-0,68%'],
      ['Ratio de Sharpe', '1,12', '0,76', '+0,36'],
      ['Max Drawdown', '-4,18%', '-6,30%', '+2,12%'],
      ['Corrélation avec MASI', '0,87', '—', '—'],
    ],
  },
  {
    title: 'Tableau 2 — Répartition sectorielle de l\'actif',
    headers: ['Secteur', 'Poids (%)', 'Nb Lignes', 'Perf. Secteur'],
    rows: [
      ['Banques & Assurances', '24,5%', '6', '+11,2%'],
      ['Télécommunications', '15,3%', '2', '+5,8%'],
      ['Immobilier & Construction', '12,8%', '5', '+3,4%'],
      ['Mines & Énergie', '10,2%', '4', '+14,7%'],
      ['Distribution & Commerce', '8,7%', '3', '-2,1%'],
      ['Industrie', '6,3%', '4', '+1,9%'],
      ['Autres', '22,2%', '23', '+6,5%'],
    ],
  },
  {
    title: 'Tableau 3 — Évolution de l\'actif net (MAD)',
    headers: ['Trimestre', 'Actif Net', 'Souscriptions', 'Rachats', 'Variation'],
    rows: [
      ['T1 2023', '2 524 100 000', '+185 400 000', '-98 200 000', '+3,5%'],
      ['T2 2023', '2 641 800 000', '+142 600 000', '-62 800 000', '+4,7%'],
      ['T3 2023', '2 733 500 000', '+118 900 000', '-74 300 000', '+3,5%'],
      ['T4 2023', '2 845 342 000', '+167 200 000', '-88 600 000', '+4,1%'],
    ],
  },
]

export function useExtraction() {
  const [file, setFile] = useState(null)
  const [model, setModel] = useState('Docling')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle') // idle | running | done | error
  const [result, setResult] = useState(null)

  const startExtraction = useCallback(async () => {
    if (!file) return
    setStatus('running')
    setProgress(0)
    setResult(null)

    // Animate progress over 5 seconds
    const totalDuration = 5000
    const steps = 50
    const interval = totalDuration / steps

    for (let i = 1; i <= steps; i++) {
      await new Promise((r) => setTimeout(r, interval))
      setProgress(Math.round((i / steps) * 100))
    }

    // Build mock result
    const durationSec = model === 'Docling' ? 138 : model === 'MinerU' ? 125 : 192
    setResult({
      filename: file.name,
      model,
      pages: 32,
      tables: MOCK_TABLES.length,
      words: 8420,
      duration: `${Math.floor(durationSec / 60)}m ${durationSec % 60}s`,
      text: MOCK_EXTRACTED_TEXT,
      extractedTables: MOCK_TABLES,
    })
    setStatus('done')
  }, [file, model])

  const reset = useCallback(() => {
    setFile(null)
    setProgress(0)
    setStatus('idle')
    setResult(null)
  }, [])

  return { file, setFile, model, setModel, progress, status, result, startExtraction, reset }
}
