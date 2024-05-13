import axiosInstance from "@src/modules/auth/utils/axios"
import { message } from "antd"

export  async function fetchGitHubCommits(props:{
    user:string
    repo:string
    ref:string
}){
    const{user,repo,ref}=props
    try{
        const response = await axiosInstance.get(`repos/${user}/${repo}/pulls/${ref}/commits`)
        
        return response.data
    }catch(error){
            message.error('failed to get commits list')
    }

}

// 