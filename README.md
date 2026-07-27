# FinInfo Extraction Platform — Frontend

Interface utilisateur interne de la plateforme d'extraction de documents financiers par IA, développée pour **FinInfo Solutions**.

## Stack technique

| Technologie     | Version  | Rôle                        |
|----------------|----------|-----------------------------|
| React          | 18.2     | Framework UI                |
| Vite           | 5.1      | Bundler & dev server        |
| TailwindCSS    | 3.4      | Styling                     |
| React Router   | 6.22     | Routing SPA                 |
| Recharts       | 2.10     | Graphiques                  |
| Lucide React   | 0.344    | Icônes                      |

## Démarrage rapide

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
cd extraction-frontend
npm install
```

### Lancer en développement

```bash
npm run dev
```

L'application sera disponible sur **http://localhost:5173**

### Build de production

```bash
npm run bui
```

Le bundle sera généré dans le dossier `dist/`.

## Authentification (mode démo)

> Utilisez **n'importe quelle adresse e-mail** et le mot de passe `fininfo2024`

Utilisateur simulé :
- **Nom** : Turki Youssef
- **Email** : turki@fininfo.com
- **Rôle** : Ingénieur IA

## Pages disponibles

| Route         | Page                     | Description                              |
|--------------|--------------------------|------------------------------------------|
| `/login`     | Connexion                | Authentification mock                    |
| `/dashboard` | Tableau de bord          | KPIs, graphiques, extractions récentes   |
| `/extraction`| Extraction               | Upload PDF + sélection modèle + résultats|
| `/history`   | Historique               | Table paginée avec filtres et recherche  |
| `/benchmark` | Benchmark                | Comparaison multi-modèles                |
| `/settings`  | Paramètres               | Profil + mot de passe + préférences      |

## Structure du projet

```
src/
├── pages/          # Pages principales (Login, Dashboard, etc.)
├── components/
│   ├── layout/     # Sidebar, Navbar, Layout
│   ├── ui/         # Card, Button, Badge, Table, ProgressBar
│   ├── extraction/ # FileUploader, ModelSelector, ExtractionResult, Progress
│   └── benchmark/  # BenchmarkTable, BenchmarkChart
├── context/        # AuthContext
├── hooks/          # useAuth, useExtraction
└── mock/           # extractions.js, benchmarks.js, stats.js
```

## Connexion au backend

Le fichier `vite.config.js` contient un proxy commenté prêt à l'emploi :

```js
// Décommenter dans vite.config.js pour connecter le backend FastAPI
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## Modèles d'extraction supportés

- **Docling** — Extraction structurée haute précision (recommandé)
- **MinerU** — Bon équilibre vitesse/précision
- **PaddleOCR** — Basé sur OCR, pour documents scannés

---

Développé pour usage interne — FinInfo Solutions © 2024
