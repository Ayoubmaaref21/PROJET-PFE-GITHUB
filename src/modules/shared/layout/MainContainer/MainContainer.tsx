import { CSSProperties, ReactElement } from 'react'
import NavList, { INavList } from '../../components/NavList'

export interface IMainContainer {
  children: ReactElement | ReactElement[]
  linkProps: INavList
  style?: CSSProperties
}
export default function MainContainer({ children, linkProps, style }: IMainContainer) {
  return (
    <div className="main-container" style={{ ...style }}>
      
      <NavList {...linkProps} />
      {children}
    </div>
  )
}
