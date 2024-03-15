import AuthProvider from './modules/auth/context/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { store } from './modules/shared/store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import App from './app/App'
import './app/index.scss'
import './i18n'
import Login from './modules/auth/features/Login/Login'
import UniverseWrapper from './modules/shared/layout/UniverseWrapper'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HelmetProvider>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense>
            <UniverseWrapper>
              <Login />
            </UniverseWrapper>
            {/* <App /> */}
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </HelmetProvider>
)
