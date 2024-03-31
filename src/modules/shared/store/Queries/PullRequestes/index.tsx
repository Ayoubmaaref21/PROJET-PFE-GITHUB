import axiosInstance from "@src/modules/auth/utils/axios";
import { message } from "antd";

export  async function fetchGitHubRepoPulls(props:{
    user:string
    repo:string
}){
    const{user,repo}=props
      try{
        const response = await axiosInstance.get(`repos/${user}/${repo}/pulls`)
        return response.data
    }catch(error){
            message.error('failed to get repositories pull requestes')
    }
    
}