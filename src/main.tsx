
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make public files available in the build
import "../public/badgeList.js";
import "../public/badgeLogic.js";

const rootEl = typeof document !== "undefined" ? document.getElementById("root") : null;
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
