import { link } from "./link";
export const listarContas_a_PagarApi = async()=>{
    let response = "" 
    await fetch(link+"contasapagar/listarContas_a_pagar",{
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
export const adicionarContas_a_PagarApi = async(nome:string, valor:number, idMes:string)=>{
    let response = "" 
    await fetch(link+"contasapagar/adicionarcontas_a_pagar",{
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

export const deletarContas_a_PagarApi = async(id:string)=>{
    let response = "" 
    await fetch(link+"contasapagar/deletarcontas_a_pagar",{
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


export const atualizarContas_a_PagarApi = async(id:string, nome:string, valor:number, idMes:string)=>{
    let response = "" 
    await fetch(link+"contasapagar/atualizarcontas_a_pagar",{
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