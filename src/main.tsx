import { createRoot } from 'react-dom/client'
import './index.css'
import { Suspense, lazy, StrictMode } from 'react'

const App = lazy(() => import('./App'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<h2>Preparing Your Desktop...</h2>}>
      <App />
    </Suspense>
  </StrictMode>,
)
