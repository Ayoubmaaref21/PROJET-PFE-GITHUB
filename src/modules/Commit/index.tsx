import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../shared/store"
import { fetchGitHubCommits } from "../shared/store/Queries/Commits"
import '../Commit/index.scss'

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
      console.log(commits)
    interface ICommit{
        message:string
        committer:{avatar_url:string}
        commit:{message:string,committer:{date:string} }

    }
     
      return(
          
          <div className="one-commit-container">
              <div className="one-commit-container__head">
                  <p className="one-commit-container__head__title">Commits List:</p>
              </div>
              {
                commits?.map((commit: ICommit) => (
                    <div className="one-commit-container__content" > 
                        <div className="one-commit-container__content__left">
                            <img className="one-commit-container__content__left__avatar" src={commit?.committer?.avatar_url} alt="avatar" /> 
                            <p className="one-commit-container__content__left__message">{commit?.commit?.message}</p>
                           
                        </div>
                        <div className="one-commit-container__content__right">
                            <p className="one-commit-container__content__right__message">{commit?.commit?.committer?.date}</p>
                        </div>
                    </div>
                    
                ))
            }
              

          </div>
          
      )
}