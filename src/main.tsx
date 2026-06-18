import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Crop favicon to face area: load image, draw 2x-zoomed top-centre slice onto canvas
function applyZoomedFavicon() {
  const img = new Image();
  img.onload = () => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    // Draw the top-centre 50% of the image (face area) scaled to fill the 64×64 favicon
    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;
    const cropW = srcW * 0.5;       // 50% width from centre
    const cropH = srcH * 0.5;       // top 50% height
    const cropX = (srcW - cropW) / 2;
    const cropY = 0;
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, size, size);
    const link: HTMLLinkElement =
      document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = canvas.toDataURL('image/png');
    document.head.appendChild(link);
  };
  img.src = '/assets/favicon.jpg';
}
applyZoomedFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
