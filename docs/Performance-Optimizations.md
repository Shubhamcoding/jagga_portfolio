# Performance Optimizations

This document details the performance optimization strategies applied to the Jagga & Co. Portfolio to ensure lightning-fast load times and smooth rendering.

## 1. Asset Optimization
- **Video Compression:** The original `hero-bg.mp4` was 98MB, causing massive initial load blockages. We compressed it using `ffmpeg` (H.264, CRF 28, 1280px width, 24fps) down to **4.4MB** without noticeable quality loss. The original is kept as `hero-bg-original.mp4` for backup.
- **Image Compression:** High-quality PNG screenshots (e.g., `ss3.png` at 1.9MB) were converted to optimized JPEGs, reducing image payload size by over **80%**.

## 2. JavaScript & Rendering
- **Lazy Loading (Code Splitting):** Implemented `React.lazy()` and `<Suspense>` in `App.jsx`. Non-critical routes (Work, About, Services, Contact) are now lazy-loaded, meaning users only download the JavaScript for those pages when they actually navigate to them.
- **Animation Tuning:** Entrance animations in the Hero component were originally delayed up to 1.6s. These delays were reduced by 40% to make the site feel much more responsive while maintaining the premium staggered reveal effect.
- **Mobile GPU Relief:** The `AmbientBackground.jsx` component renders heavy blur filters. A mobile-detection listener was added so that on devices ≤768px, it only renders 2 orbs instead of 5, and it ignores mouse tracking. This prevents frame-drops when scrolling on mobile.

## 3. Build & Network
- **Font Preloading:** Added `rel="preload"` for Google Fonts (Inter and Outfit) in `index.html` to prevent Render-Blocking resources and mitigate FOUT (Flash of Unstyled Text).
- **Vite Chunking:** Split `react`, `react-dom`, `react-router-dom`, and `motion` into a separate `vendor` chunk in `vite.config.js`. This allows the browser to cache third-party libraries independently from the application code.
