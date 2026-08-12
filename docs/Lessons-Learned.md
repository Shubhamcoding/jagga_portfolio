# Jagga Portfolio - Lessons Learned & Project Notes

This document contains a running log of problems we encountered, how we solved them, and lessons we want to carry over to future projects. AI agents can read this file to avoid making the same mistakes again!

## UI & Media Loading
* **Video Backgrounds:** When we replaced the static hero image (`hero-bg image`) with a background video, we noticed loading delays. 
  * *Lesson:* Always use a fallback `poster` image (like we did with `hero-bg-poster.jpg`) so the user doesn't see a blank space while the video buffers.

## Navigation & Animations
* **Navbar Slider:** We had to spend extra time fixing the navbar slider animation over the hero page.
  * *Lesson:* When overlaying navbars on media-heavy hero sections, pay close attention to CSS transitions and z-indexes early in the development process to avoid janky animations.

## Component Routing
* **Team Cards:** Team cards in the "About Us" section need to be interactive.
  * *Lesson:* Ensure that small UI elements like team cards have proper redirects/links set up right from the start rather than treating them as static UI elements. 

---
*Note: Add new bugs or project decisions here as you continue building!*
