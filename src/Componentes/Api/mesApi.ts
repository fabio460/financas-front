import { link } from "./link";

export const listarMesApi = async(id:string)=>{
    let response = "" 
    await fetch(link+"mes/listarMes/"+id,{
     headers:{
         "Content-Type":"application/json"
     },
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
}
export const adicionarMesApi = async(idDoUsuario:string, mesReferente:string, Ano?:number)=>{
    let response = "" 
    await fetch(link+"mes/adicionarMes",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"post",
     body:JSON.stringify({idDoUsuario, mesReferente, Ano})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
}

export const deletarMesApi = async(id:string)=>{
    let response = "" 
    await fetch(link+"mes/deletarMes",{
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


export const atualizarMesApi = async(id:string, idDoUsuario:string, mesReferente:string, Ano?:number)=>{
    let response = "" 
    await fetch(link+"mes/atualizarMes",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"put",
     body:JSON.stringify({id, idDoUsuario, mesReferente, Ano})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
}