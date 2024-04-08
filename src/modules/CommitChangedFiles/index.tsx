import 'diff2html/bundles/css/diff2html.min.css';
import { useState } from 'react';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PATH } from "../auth/routes/paths";
import "../CommitChangedFiles/index.scss";
import LoadingScreen from "../shared/components/Loading";
import MainContainer from "../shared/layout/MainContainer/MainContainer";
import MainLayout from "../shared/layout/MainLayout/MainLayout";
import { useAppSelector } from "../shared/store";
import { fetchOneCommit } from "../shared/store/Queries/Files";
import FileContent from "./File content";




export default function FilesChanged(){
 
    const {id,ref,commits}=useParams()
    
    const {user}=useAppSelector((state)=>state.auth)

    
    const {data: onecommit,isLoading}=useQuery({
        queryFn:()=>fetchOneCommit({user:user?.user_metadata?.user_name!,repo:id!,ref:ref!}),
        
        queryKey:['onecommit',{}],
        staleTime:Infinity,
        cacheTime:1,
      })
   

interface Ionecommit{
    filename:string
    
        additions:number
        deletions:number
}



const[SelectedIndex,setSelectedIndex]=useState<number | null> (null)


  

   
    return(
        
        <MainLayout>
        <MainContainer linkProps={{title:`${commits}`,
        links:[{href:PATH.REPO,name:"repositories"},{href:PATH.PULL.replace(':id',`${id}`),name:"pull requestes"},{href:window.location.pathname,name:"commits"} ] }} >
            
            {
                isLoading? (<LoadingScreen blur  size="full"/> ):
                <div className="container" >
            <div className="files-container" >
            <div className="files-container__title">
                    <p className="files-container__title__content">Files:</p>
            </div>
            <div className="files-container__list">
                { onecommit?.files?.map((onecommit:Ionecommit,index:number)=>(
         
                        <div className="files-container__list__file" tabIndex={index+1} onClick={()=>setSelectedIndex(index)} >
                                <p className="files-container__list__file__name"  >{onecommit?.filename}</p>
                                <div className="files-container__list__file__stats">
                                        <p className="files-container__list__file__stats__added">{onecommit?.additions}</p>
                                        <p className="files-container__list__file__stats__deleted">{onecommit?.deletions}</p>
                                        
                                        
                                </div>
                                
                                
                        </div>
                        
                ))
                    
                }
            </div>

        </div>
        <div className="file-content">
        <FileContent selectedFileIndex={SelectedIndex} />
            
        </div>
            </div>
            }
        

         </MainContainer>
        </MainLayout>
 
        
    )
}