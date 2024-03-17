import GithubIcon from '@src/modules/shared/assets/icons/github'
import Canvas from '@src/modules/shared/components/Canvas/Canvas'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import { useAppDispatch } from '@src/modules/shared/store'
import { supabase } from '@src/modules/shared/utils/supabase'
import { login } from '../../data/authThunk'


const Login = () => {
  const dispatch = useAppDispatch()
  async function signInWithGithub() {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `home page url /`,
        
      },
    })
    dispatch(login())
  }

  return (
    <>
     <Canvas/>
    <CardBalance>
      <div className="login-module">
        <div className="login-module__card">
          <div className="login-module__card__header">
            <p className="login-module__card__header__title">Welcome</p>
            <p className="login-module__card__header__description">
              Login via your Github account to get started with our app
            </p>
          </div>
          <div className="login-module__card__footer">
            <button className="login-module__card__footer__loginbtn" onClick={signInWithGithub}>
              <GithubIcon className="login-module__card__footer__loginbtn__icon" />
              <p className="login-module__card__footer__loginbtn__text">Sign in with Github</p>
            </button>
          </div>
        </div>
      
      </div>
    </CardBalance>
    </>
   
  )
}

export default Login
