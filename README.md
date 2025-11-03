# Weather App

Interactive weather dashboard that lets you switch between light/dark themes, browse multi-day forecasts, and dive into detailed day insights. Built with React, Redux Toolkit, and the Open-Meteo API.

## ✨ Features
- Real-time current conditions with condition icons.
- 7- or 10-day forecast slider with skeleton loading states and theme-aware styling.
- Click a forecast card to sync the top summary and detailed stats panel.
- Theme toggle (light/dark) with contextual UI updates.
- City chooser with instant re-fetch via Open-Meteo geocoding.
- GitHub Pages deployment workflow out of the box.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 8+

### Install & Run
```bash
npm install
npm start
```
Visit `http://localhost:3000` for the dev build; edits hot reload automatically.

### Build for Production
```bash
npm run build
```
Outputs a production-optimized bundle to the `build/` directory.

## 🛠 Tech Stack
- React 18
- Redux Toolkit + TypeScript
- Axios
- Open-Meteo API
- GitHub Actions → GitHub Pages

## 📦 Deployment
This repo ships with `.github/workflows/deploy-github-pages.yml` so that pushes to `master` build the site and publish to GitHub Pages. Ensure repository settings → Pages source is set to **GitHub Actions**.

## 🤝 Contributing
1. Fork the repo and create a feature branch.
2. Run `npm run lint`/tests if you add them.
3. Open a PR with a clear description of the change.


