import { PATH } from '@src/modules/auth/routes/paths'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store'
import '../NotFound/_NotFound.scss'
import astronaut from "./assets/astronaut.svg"
const NotFound = () => {
  const isAuthenticated=useAppSelector((state)=>state.auth.isAuthenticated)
  const navigate=useNavigate()
  const handleclick=()=>{
      isAuthenticated?navigate(PATH.REPO):navigate(PATH.LOGIN)
  }
  return (
    <>
    <nav className="navbar">
      404 NOT FOUND 🚀
     
    </nav>

    <main>
      <div className="message">
        <strong>404</strong>
        <p className="title">LOOKS LIKE YOU ARE LOST IN THE SPACE</p>
        <p className="message-text">
          The page you are looking for might be removed or is temporally
          unavailable
        </p>
        <button className="button" onClick={()=>handleclick()}>GO BACK HOME</button>
      </div>
    </main>

    <div className="box-astronaut">
      <img src={astronaut} alt="" />
    </div></>
  )
}

export default NotFound
