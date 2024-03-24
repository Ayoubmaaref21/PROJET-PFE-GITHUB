
import { useQuery } from "react-query";
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
    
    return(
        <>
        
        <MainLayout>
       
         <MainContainer  linkProps={{title:"repositories",links:[{href:PATH.REPO,name:"repositories"}]}}>
            { 
            isLoading? (<LoadingScreen blur  size="full"/> ) : ( 
            <div className="repositories">
                     {!repositories ||  repositories?.length ==0 ? ( 
                    <NoData title={'can not find any repositorie'}/>
                 ) : ( 
                    repositories?.map((repo:{name:string,visibility:string}, index:number)=>(
                      
                        <CardSkew autoColors={index+1}>
                            <div className="repositories__card">
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