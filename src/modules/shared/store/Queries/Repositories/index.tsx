import axiosInstance from "@src/modules/auth/utils/axios";
import { message } from "antd";

export  async function fetchGitHubRepo(){
      try{
        const response = await axiosInstance.get(`/user/repos`)
        return response.data
    }catch(error){
            message.error('failed to get repositories')
    }
    
}