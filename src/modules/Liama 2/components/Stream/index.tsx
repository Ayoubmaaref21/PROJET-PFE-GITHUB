import { useAppSelector } from "@src/modules/shared/store"
import { fetchOneFileContentCode } from "@src/modules/shared/store/Queries/Files"
import Lottie from "react-lottie"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import liamaAvatar from '../../assets/images/chat_avatar.png'
import UseBootStream from "../Boot"
import HilightCode from "../Hilights"
import '../Stream/index.scss'

import animationData from "../../../shared/assets/animations/writing.json"
interface IStreamComponent{
    path:string | null
}

export default function  StreamComponent({path}:IStreamComponent){
    const {user}=useAppSelector((state)=>state.auth)
    const {id,ref}=useParams()

    const {data: file,isLoading}=useQuery({
        queryFn:()=>fetchOneFileContentCode({owner:user?.user_metadata?.user_name!,repo:id!,ref:ref!,path:path!}),
        
        queryKey:['file',{path}],
        staleTime:Infinity,
        cacheTime:1,
      }) 
      
 const code = file?.content ? atob(file?.content) :''
 
const {codeLines,textLines,language,lines}=UseBootStream(code)

console.log(textLines)

const options = {
    loop: true,
    autoplay: true,
    animationData: animationData ,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
   
  };
return(
  <div className="test">
      <div className="stream-wrapper">
    <div className="editor">
        <div className="stream-wrapper__text">
            <div className="stream-wrapper__text__user">
                <img src={liamaAvatar} className="stream-wrapper__text__avatar"/>
                <p className="stream-wrapper__text__name">Liama-2 AI assistant</p>
            </div>
        
             <p className="stream-wrapper__text__content">{textLines}</p>  
             <HilightCode  addLinesNumbers readyToUse={codeLines} language={language}/> 
                
                {!lines&&(<Lottie options={options} height={60} width={100} style={{margin:0}} />)}          
        </div>
    </div>

</div>
  </div>
 
 
 )}