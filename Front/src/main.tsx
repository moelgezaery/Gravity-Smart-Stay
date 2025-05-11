
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { NavigationProvider } from './context/NavigationContext'
import './i18n'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </LanguageProvider>
  </ThemeProvider>
);
