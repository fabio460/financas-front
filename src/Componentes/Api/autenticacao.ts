import { link } from "./link"

export const autenticadoApi = async(jwt:string)=>{
   let resp = ""
   await fetch(link+"usuario/autenticaUsuario",{
      headers:{
        "Content-Type":"Content-Type",
        "x-access-token":jwt
      },
      method:"get"
   })
   .then(res=>res.json())
   .then(res=>resp =res)
   return resp
}