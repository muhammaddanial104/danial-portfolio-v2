# PLAYFORM — Interactive Physics Toybox

A React + Tailwind landing page prototype with a real-time 3D physics hero.

## Stack
- React + Vite
- Tailwind CSS
- Three.js through React Three Fiber
- Rapier physics (`@react-three/rapier`)
- Drei helpers and Framer Motion

## Run locally
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Interaction
- Move the mouse over the 3D scene to collide with objects.
- Press the circular reset button to respawn the objects.
- Responsive layout for desktop and mobile.

## Important notes
- The sound button is a visual placeholder; sound effects are not wired yet.
- Replace `hello@example.com` with your contact address.
- This is the frontend prototype. MERN backend (Express, MongoDB, authentication, CMS/admin) is not included because this concept does not currently need server-side data.
- For production, add reduced-motion handling, mobile touch interaction, lazy loading, performance profiling, and fallbacks for devices without WebGL.
