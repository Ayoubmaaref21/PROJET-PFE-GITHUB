import Canvas from '../../components/Canvas/Canvas'
import Header from '../../components/Header'
import Stars from '../../components/Stars'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
   
      <div className="main-layout">
        <Header />
        <Stars />
        {children}
        {/* <Canvas />  */}
      </div>
    
  )
}

export default MainLayout
