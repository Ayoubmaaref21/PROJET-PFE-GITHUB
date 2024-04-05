import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PATH } from "../auth/routes/paths";
import MainContainer from "../shared/layout/MainContainer/MainContainer";
import MainLayout from "../shared/layout/MainLayout/MainLayout";
import { useAppSelector } from "../shared/store";
import { fetchOneCommit } from "../shared/store/Queries/Files";
import "../CommitChangedFiles/index.scss";

export default function FilesChanged(){
    const {id}=useParams()
    const{ref}=useParams()
    const {user}=useAppSelector((state)=>state.auth)

    const {commits}=useParams()
    const {data: onecommit,isLoading}=useQuery({
        queryFn:()=>fetchOneCommit({user:user?.user_metadata?.user_name!,repo:id!,ref:ref!}),
        
        queryKey:['onecommit',{}],
        staleTime:Infinity,
        cacheTime:1,
      })
   
console.log(onecommit)
interface Ionecommit{
    filename:string
   
}
    return(
        
        <MainLayout>
        <MainContainer linkProps={{title:`${commits}`,
        links:[{href:PATH.REPO,name:"repositories"},{href:PATH.PULL.replace(':id',`${id}`),name:"pull requestes"},{href:window.location.pathname,name:"commits"} ] }} >
        <div className="files-container">
            <div className="files-container__title">
                    <p className="files-container__title__content">Files:</p>
            </div>
            <div className="files-container__list">
                { onecommit?.files?.map((onecommit:Ionecommit)=>(
                        <div className="files-container__list__file">
                                <p className="files-container__list__file__name">{onecommit.filename}</p>
                        </div>
                ))
                    
                }
            </div>

        </div>

         </MainContainer>
        </MainLayout>
 
        
    )
}