import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./app.tsx"
import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "./error-boundary.tsx"
import { store } from "./store.ts"
import { showAppVersion } from "shared/utils/show-app-version.ts"
import reportWebVitals from "./report-web-vitals.ts"

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>
)

showAppVersion()

reportWebVitals(console.info)
