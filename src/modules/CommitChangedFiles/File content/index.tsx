
import StreamComponent from "@src/modules/Liama 2/components/Stream"
import ReviewButton from "@src/modules/shared/components/Buttons/Review"
import LoadingScreen from "@src/modules/shared/components/Loading"
import { useAppSelector } from "@src/modules/shared/store"
import { fetchOneCommitChanges } from "@src/modules/shared/store/Queries/Files"
import { Modal } from "antd"
import * as Diff2Html from 'diff2html'
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import noFile from '../../shared/assets/images/folder_empty.png'
import '../File content/index.scss'
interface Props {
  selectedFileIndex: number  |null;
  fileName:string |null
}
export default function FileContent({ selectedFileIndex ,fileName}: Props){
    const [htmlContent,sethmtlContent]=useState('')
    const {user}=useAppSelector((state)=>state.auth)
    const {id,ref}=useParams()
    const [popup,setPopup]=useState(false)
   const handleReviewClick=()=>{setPopup(true)}
   const handleCloseModal=()=>{setPopup(false)}
    const {data: changes,isLoading}=useQuery({
        queryFn:()=>fetchOneCommitChanges({user:user?.user_metadata?.user_name!,repo:id!,ref:ref!}),
        
        queryKey:['changes',{}],
        staleTime:Infinity,
        cacheTime:1,
      })
    
    const fileDiffs = parseDiffString(changes);
    interface FileDiff{
        diffContent:string
        filename:string
    } 
    function parseDiffString(diffString: string): FileDiff[]  {
        const fileDiffs: FileDiff[] = [];
        let currentFilename: string | null = null;
        let currentDiffContent: string = '';
    
        const lines = diffString?.split('\n');
        
    
        lines?.forEach(line => {
          if (line.startsWith('diff --git')) {
            // If a new file diff starts, save the previous one if exists
            if (currentFilename!== null) {
              fileDiffs?.push({ filename: currentFilename, diffContent: currentDiffContent });
              currentDiffContent = '';
            }
            // Extract filename from diff header
            currentFilename = line?.substring('diff --git'.length)?.trim();
          } else {
            // Append lines to diff content
            currentDiffContent += line + '\n';
          }
        });
    
      
        if (currentFilename!== null) {
          fileDiffs?.push({ filename: currentFilename, diffContent: currentDiffContent });
        }
    
        return fileDiffs;
      }
      useEffect(()=>{ if(changes!){const  diffHtml = Diff2Html.html(  fileDiffs[selectedFileIndex].diffContent, {
        inputFormat: 'diff',
        highlight: true,
        colorScheme: 'dark',
        outputFormat: 'line-by-line',
        drawFileList: true,
        DiffStyleType: 'char',
    })
    sethmtlContent(diffHtml)} },[selectedFileIndex])
     

    
    return(
      <>
      {
  isLoading ? (
    <LoadingScreen blur size="s" />
  ) : (
    <>
      <div className="file-content__title">File content:</div>
      {selectedFileIndex === null ? (
        <div className="no-file-selected">
          <img className="no-file-selected__image" src={noFile} alt="Empty folder" />
          <p className="no-file-selected__message">No File Selected</p>
        </div>
      ) : (
        <div className="file-content__content">
          <div className="code-diff__wrapper">
            <div
              className="code-diff"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <div className="review-button">
            <ReviewButton title="Review Code" onClick={handleReviewClick}/>
            </div>
            
            <Modal
        title={'Code Review'}
        className="editor__modal"
        visible={popup}
        onCancel={handleCloseModal
        }
      >
     <StreamComponent path={fileName}/>
      </Modal>
         
          </div>
        
        </div>
        
      )}
    </>
  )
}
      </>
    )

    
  
}

