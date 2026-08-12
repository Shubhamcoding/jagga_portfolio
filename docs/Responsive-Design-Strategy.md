# Responsive Design Strategy

This document outlines the mobile and tablet responsive design strategy applied across the Jagga & Co. Portfolio.

## Breakpoint Architecture
We use a standard set of media queries in `App.css` and `index.css` to gracefully scale down the layout:
* **`992px` (Tablets / Landscape Phones):** Used for intermediate grid layouts (e.g., changing 3-column grids to 2-columns).
* **`768px` (Small Tablets / Large Phones):** The primary breakpoint where major layout shifts occur (e.g., flex-direction changes from row to column, mobile hamburger menu kicks in).
* **`480px` (Small Phones):** Used for fine-tuning typography, reducing padding, and maximizing usable screen real estate.

## Component-Specific Adjustments

### Global Layout (`index.css`)
* Nav-height reduces from 80px to 64px on phones to save vertical space.
* Core typography variables (`--text-5xl` through `--text-7xl`) incrementally step down at 992px, 768px, and 480px.

### Hero Section
* **Desktop:** Large padding, 60vh minimum height, 5 animated orbs.
* **Mobile:** Padding reduced, min-height drops to 45vh. Stats bar switches from horizontal layout to vertical stack. Particle blobs are scaled down to prevent horizontal overflow.

### Work / Projects Section
* Filter tabs switch from wrapping flex items to a horizontally scrollable container (`overflow-x: auto`) with a hidden scrollbar on mobile.
* Project image heights are reduced from 320px down to 200px on small screens to prevent the cards from dominating the entire viewport.

### About & Services
* **About Grid:** 3 columns (Desktop) → 2 columns (992px Tablet) → 1 column (768px Mobile).
* Reduced padding within value cards and service cards to maximize readability on narrow screens.

### Modal Windows
* The Project iframe modal displays at `1200px` max-width on desktop.
* At `768px`, it shrinks to `96vw`.
* At `480px`, it becomes fully fullscreen (`100vw`, `100vh`) with 0 border-radius, and text labels on buttons are hidden to leave only icons.
