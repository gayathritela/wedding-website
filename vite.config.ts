import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ── Vite Configuration ─────────────────────────────────────────────────────
// For GitHub Pages: change `base` to '/your-repo-name/'
// For custom domain or root deployment: keep base as '/'
export default defineConfig({
  plugins: [react()],
  base: '/', // ← Change to '/REPO_NAME/' for GitHub Pages
})
