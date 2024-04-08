
import { fetchOneCommitChanges } from "@src/modules/shared/store/Queries/Files"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import * as Diff2Html from 'diff2html'
import { useParams } from "react-router-dom"
import { useAppSelector } from "@src/modules/shared/store"
import LoadingScreen from "@src/modules/shared/components/Loading"
export default function FileContent(){
    const [htmlContent,sethmtlContent]=useState('')
    const {user}=useAppSelector((state)=>state.auth)
    const {id,ref}=useParams()

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
      useEffect(()=>{ if(changes!){const diffHtml = Diff2Html.html(  fileDiffs[2].diffContent, {
        inputFormat: 'diff',
        highlight: true,
        colorScheme: 'dark',
        outputFormat: 'line-by-line',
        drawFileList: true,
        DiffStyleType: 'char',
    })
    sethmtlContent(diffHtml)} },[changes])

    
    return(<>
        { isLoading? (<LoadingScreen blur  size="s"/> ):(<> <div className="file-content__title">File content:</div>
        <div className="file-content__content">  <div className="code-diff__wrapper">
          <div className="code-diff" dangerouslySetInnerHTML={{ __html:htmlContent}} />
          
   </div>
   </div></>)}
       </>
    
    )
}

