import { link } from "./link";
export const listarGanhos = async()=>{
    let response = "" 
    await fetch(link+"ganhos/listarGanhos",{
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
export const adicionarGanhos = async(nome:string, valor:number, idMes:string)=>{
    let response = "" 
    await fetch(link+"ganhos/adicionarGanhos",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"post",
     body:JSON.stringify({nome, valor, idMes})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
}

export const deletarGanhos = async(id:string)=>{
    let response = "" 
    await fetch(link+"ganhos/deletarGanhos",{
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


export const atualizarGanhos = async(id:string, nome:string, valor:number, idMes:string)=>{
    let response = "" 
    await fetch(link+"ganhos/atualizarGanhos",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"put",
     body:JSON.stringify({id,nome, valor, idMes})
    })
    .then(r=>r.json())
    .then(r=>{
     response = r
    })
    return response;
}