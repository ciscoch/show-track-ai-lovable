
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './contexts/AppContext'

// Make public files available in the build
import "/public/badgeList.js";
import "/public/badgeLogic.js";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
