import { link } from "./link"

export const loginApi = async(email:string, senha:string)=>{
   let response = "" 
   await fetch(link+"usuario/logarUsuario",{
    headers:{
        "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({email,senha})
   })
   .then(r=>r.json())
   .then(r=>{
    response = r
   })
   return response;
}

export const cadastroApi = async(email:string, senha:string, nome:string)=>{
    let response = "" 
    await fetch(link+"usuario/criarUsuario",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"post",
     body:JSON.stringify({email,senha,nome})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
 }

 export const deletarUsuarioApi = async(id:string)=>{
    console.log(id)
    let response = "" 
    await fetch(link+"usuario/deletarUsuario",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"delete",
     body:JSON.stringify({id})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
 }

 export const atualizarUsuarioApi = async(id:string, email:string, senha:string, nome:string)=>{
    let response = "" 
    await fetch(link+"usuario/atualizarUsuario",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"put",
     body:JSON.stringify({id, email, senha, nome})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
 }
