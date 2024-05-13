import * as dayjs from 'dayjs'
import { useState } from "react"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { PATH } from "../auth/routes/paths"
import '../Commit/index.scss'
import LoadingScreen from "../shared/components/Loading"
import { useAppSelector } from "../shared/store"
import { fetchGitHubCommits } from "../shared/store/Queries/Commits"

interface Commitsprops{
    commitRef:string
}
export default  function Commits({commitRef}:Commitsprops){
    const {id}=useParams()
    const {user}=useAppSelector((state)=>state.auth)
  
    const {data: commits,isLoading}=useQuery({
        queryFn:()=>fetchGitHubCommits({user:user?.user_metadata?.user_name!,repo:id!,ref:commitRef!}),
        
        queryKey:['commits',{commitRef}],
        staleTime:Infinity,
        cacheTime:1,
      })
    
 
    

   const[commitSha,setcommitSha]=useState('')
   
     
      const navigate=useNavigate()
     
      
      const handleCommitClick=(commitSha:string,message:string)=>{
          setcommitSha(commitSha)
         
          navigate(`${PATH.File
            .replace(':commits',message)
            .replace(':ref',commitSha)
            .replace(':id',`${id}`)}`)
   }
  

    interface ICommit{
        sha:string
       
        committer:{avatar_url:string}
        commit:{message:string,committer:{date:string} }

    }
      return(
          
          <div className="one-commit-container">
              <div className="one-commit-container__head">
                  <p className="one-commit-container__head__title">Commits List:</p>
              </div>
              {
                   isLoading? (<LoadingScreen blur  size="s"/> ):( commits?.map((commit: ICommit) => (
                    <div className="one-commit-container__content " onClick={()=>handleCommitClick(commit.sha,commit?.commit?.message)}> 
                        <div className="one-commit-container__content__left">
                            <img className="one-commit-container__content__left__avatar" src={commit?.committer?.avatar_url} alt="avatar" /> 
                            <p className="one-commit-container__content__left__message">{commit?.commit?.message}</p>
                           
                        </div>
                        <div className="one-commit-container__content__right">
                            <p className="one-commit-container__content__right__message">{dayjs(commit?.commit?.committer?.date).format("YYYY-MM-DD/HH:mm")}</p>
                        </div>
                    </div>
                    
                )))
               
            }
              

          </div>
          
      )
}