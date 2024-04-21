import axiosInstance from "@src/modules/auth/utils/axios"
import { message } from "antd"

export  async function fetchOneCommit(props:{
    user:string
    repo:string
    ref:string

}){const {user,repo,ref}=props
try{
    const response=await axiosInstance.get(`repos/${user}/${repo}/commits/${ref}`)
    return response.data
}
catch(error){
    message.error('failed to get commit')
}

}
export  async function fetchOneCommitChanges(props:{
    user:string
    repo:string
    ref:string

}){const {user,repo,ref}=props
try{
    const response=await axiosInstance.get(`repos/${user}/${repo}/commits/${ref}`,{
        headers : 
        {Accept: 'application/vnd.github.v3.diff; charset=utf-8'}
    })
    return response.data

}
catch(error){
    message.error('failed to get commit')
}

}

export async function fetchOneFileContent(props:{
    owner:string
    repo:string
    sha:string
    path:string
}){
    const {owner,repo,sha,path}=props
    try{
        const response=await axiosInstance.get(`repos/${owner}/${repo}/cpmmits/${sha}?file=${path}`,{
            headers : 
            {Accept: 'application/vnd.github.v3.diff; charset=utf-8'}
        })
        return response.data
    }catch(error){
        message.error('Failed to fetch file content')
    }
   
}
export async function fetchOneFileContentCode(props:{
    owner:string
    repo:string
    ref:string
    path:string
}){
    const {owner,repo,ref,path}=props
    try{
        const response=await axiosInstance.get(`repos/${owner}/${repo}/contents/${path}?ref=${ref}`)
        return response.data
    }catch(error){
        message.error('Failed to fetch file content')
    }
   
}
