# Oskar Chudoba - Cybersecurity Portfolio

A modern, responsive portfolio website showcasing cybersecurity projects and tools.

## 🚀 Deployment to GitHub Pages

This project is configured to deploy directly to GitHub Pages. Follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Commit and Push
```bash
git add .
git commit -m "Deploy portfolio updates"
git push origin main
```

### 4. Enable GitHub Pages
1. Go to your repository settings
2. Scroll to "Pages" section
3. Set source to "Deploy from a branch"
4. Select "main" branch and "/ (root)" folder
5. Save

Your site will be available at `https://dexsterr.github.io`

## 🛠️ Development

### Local Development
```bash
npm run dev
```

### Build for Development
```bash
npm run build:dev
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

- `src/` - Source code
- `assets/` - Built assets (auto-generated)
- `index.html` - Main HTML file (auto-generated)
- `vite.config.ts` - Vite configuration
- `tailwind.config.*` - Tailwind CSS configuration

## 🎨 Features

- Responsive design with dark cyberpunk theme
- D3.js animated visualizations for projects
- Modern React with TypeScript
- Tailwind CSS for styling
- Optimized for performance
