
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { PATH } from "../auth/routes/paths";
import "../Repositories/index.scss";
import CardSkew from "../shared/components/Cards/Cards-SKEW/Card-skew";
import LoadingScreen from "../shared/components/Loading";
import NoData from "../shared/components/NoData";
import MainContainer from "../shared/layout/MainContainer/MainContainer";
import MainLayout from "../shared/layout/MainLayout/MainLayout";
import { fetchGitHubRepo } from "../shared/store/Queries/Repositories";

export default function Repo(){
   
   
    const {data: repositories,isLoading}=useQuery({
      queryFn:()=>fetchGitHubRepo(),
      
      queryKey:['repositories',{}],
      staleTime:Infinity,
      cacheTime:1,
    })
    const navigate=useNavigate()
    const handlerepoclick=(repo:string)=>{
        navigate(PATH.PULL.replace(':id',repo))
    }

    return(
        <>
        
        <MainLayout>
       
         <MainContainer  linkProps={{title:"repoositories",links:[{href:PATH.REPO,name:"repositories"}]}}>
            { 
            isLoading? (<LoadingScreen blur  size="full"/> ) : ( 
            <div className="repositories">
                     {!repositories ||  repositories?.length ==0 ? ( 
                    <NoData title={'can not find any repositorie'}/>
                 ) : ( 
                    repositories?.map((repo:{name:string,visibility:string}, index:number)=>(
                      
                        <CardSkew autoColors={index+1}>
                            <div className="repositories__card" onClick={()=>handlerepoclick(repo?.name)} >
                                <p className="repositories__card__name">{repo?.name}</p>  
                                <div className="repositories__card__visibility">
                                    <p className="repositories__card__visibility__type">{repo?.visibility}</p>
                                    </div> 
                            </div>

                        </CardSkew>
                          
                         
                     ))
                )} 
                </div>
                )
                }
            
             
         </MainContainer>
        </MainLayout>
        </>
    )        
}                
            
             
               
        
