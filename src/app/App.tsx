import { login } from '@src/modules/auth/data/authThunk'
import { PATH } from '@src/modules/auth/routes/paths'
import routes, { renderRoutes } from '@src/modules/shared/routes'
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const queryClient = new QueryClient()
  const { i18n } = useTranslation('translation')
  document.body.dir = i18n?.dir()

  const theme = useAppSelector((state) => state.theme.mode)
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const location = window.location.pathname
  const isAuthenticated=useAppSelector((state)=>state.auth.isAuthenticated)
  useEffect(()=>{
    dispatch(login())
   
    if( location === '/' || !location  ){
      if(isAuthenticated)
        navigate(PATH.REPO)
        else navigate(PATH.LOGIN)
    }
  
   
  },[isAuthenticated,location])

  return (
    <div id={theme}>
      <Helmet>
        <title>Welcome -CodeReviewHub</title>
      </Helmet>
      
      <QueryClientProvider client={queryClient}>{renderRoutes(routes)}</QueryClientProvider>
      
    </div>
  )
}

export default App
