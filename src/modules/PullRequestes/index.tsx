import MainContainer from "@src/modules/shared/layout/MainContainer/MainContainer";
import MainLayout from "@src/modules/shared/layout/MainLayout/MainLayout";
import { fetchGitHubRepoPulls } from "@src/modules/shared/store/Queries/PullRequestes";
import { Collapse } from 'antd';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PATH } from "../auth/routes/paths";
import Commits from "../Commit";
import '../PullRequestes/index.scss';
import LoadingScreen from "../shared/components/Loading";
import NoData from "../shared/components/NoData";
import { useAppSelector } from "../shared/store";
import OnePullRequest from "./OnePullRequest";

export default function  Pull(){
    const {id}=useParams()
    const {user}=useAppSelector((state)=>state.auth)
  
    const {data: pullRequests,isLoading}=useQuery({
        queryFn:()=>fetchGitHubRepoPulls({user:user?.user_metadata?.user_name!,repo:id!}),
        
        queryKey:['pull requestes',{}],
        staleTime:Infinity,
        cacheTime:1,
      })
    
      

interface IPullRequest{
        number:number
        
        created_at:string
        state:string
        updated_at:string
        base:{ref:string}
        head:{ref:string}
        user:{avatar_url:string}
        locked:boolean
     
    }
   


    return(
        
        <>
        
            <MainLayout>
                <MainContainer  linkProps={{title:`${id}`,links:[{href:PATH.REPO,name:"repositories"},{href:PATH.PULL.replace(':id',`${id}`),name:"pull requestes"}]}}>
                    { isLoading? (<LoadingScreen blur  size="full"/> ) :(
                           !pullRequests || pullRequests?.length===0 ? 
                           <NoData title={'can not find any pull request'}/> :
                           ( <div className="pull-request_main">
                                <Collapse 
                            items={pullRequests?.map((pull: IPullRequest) => ({
                              key: `${pull.number}`,
                             
                              label: <OnePullRequest  pull={pull}/>, 
                              children: ( 
                             
                                        <Commits  commitRef={`${pull.number}`}/> 
                                     
                                       
                                       ),
                            
                            }))} />
                           </div>
                          )

                    )
                 

               }
                               
                               
                                
                          

                </MainContainer>
            </MainLayout>
        </>
    )

}