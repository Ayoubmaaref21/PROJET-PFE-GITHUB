import { useEffect, useRef } from "react"
import Lottie from "react-lottie"
import typingAnimation from "../../../shared/assets/animations/typing.json"
import liamaAvatar from '../../assets/images/chat_avatar.png'
import UseBootStream from "../Boot"
import HilightCode from "../Hilights"
import '../Stream/index.scss'

interface IStreamComponent{
    code:string | null
    
  }

export default function  StreamComponent({code}:IStreamComponent){
 
const {codeLines,textLines,language,lines}=UseBootStream(code!)
const testDivRef = useRef<HTMLDivElement>(null);


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: typingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}
 
  const scrollToBottom = () => {
    if (testDivRef.current) {
      testDivRef.current.scrollTop = testDivRef.current.scrollHeight;
    }
  };

 
  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  
return(
  <div ref={testDivRef} className="test">
      <div className="stream-wrapper">
    <div  className="editor">
        <div className="stream-wrapper__text">
            <div className="stream-wrapper__text__user">
                <img src={liamaAvatar} className="stream-wrapper__text__avatar"/>
                <p className="stream-wrapper__text__name">CodeReviewHub assistant</p>
            </div>
        
            
             <HilightCode  addLinesNumbers readyToUse={codeLines} language={language}/> 
              <p className="stream-wrapper__text__content">{textLines}</p>   
              {!lines && (
            <Lottie options={defaultOptions} height={25} width={50} style={{ margin: 0 }} />
          )}         
        </div>
    </div>

</div>
  </div>
 
 
 )}