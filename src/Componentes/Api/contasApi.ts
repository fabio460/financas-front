import { link } from "./link";
export const listarContasApi = async()=>{
    let response = "" 
    await fetch(link+"contas/listarContas",{
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
export const adicionarContasApi = async(nome:string, valor:number, idMes:string, tipo:string, disp?:any, setAtualizarRedux?:any, atual?:any,  setCarregandoBtn?:any)=>{
    let response = "" 
    await fetch(link+"contas/adicionarcontas",{
     headers:{
         "Content-Type":"application/json"
     },
     method:"post",
     body:JSON.stringify({nome, valor, idMes, tipo})
    })
    .then(r=>r.json())
    .then(r=>{

        response = r
    })
    return response;
}

export const deletarContasApi = async(id:string, disp?:any,setAtualizarRedux?:any, atual?:any,  setCarregandoBtn?:any)=>{
    let response = "" 
    await fetch(link+"contas/deletarcontas",{
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


export const atualizarContasApi = async(id:string, nome:string, tipo:string,valor:number, idMes:string, disp?:any, setAtualizarRedux?:any, atual?:any,  setCarregandoBtn?:any)=>{
    let response = "" 
    await fetch(link+"contas/atualizarcontas",{
        headers:{
            "Content-Type":"application/json"
        },
        method:"put",
        body:JSON.stringify({id,nome, valor, idMes, tipo})
    })
    .then(r=>r.json())
    .then(r=>{
        response = r
    })
    return response;
}

export const inverterContaSelecionadaApi = async(id:string, disp?:any, setAtualizarRedux?:any, atual?:any,  setCarregandoBtn?:any)=>{
    let response = ""
     fetch(link+"contas/inverterContaSelecionada",{
        headers:{
            "Content-Type":"application/json"
        },
        method:"put",
        body:JSON.stringify({id})
    })
    .then(r=>r.json())
    .then(r=>{
        disp(setAtualizarRedux(!atual))
        setTimeout(() => {
            setCarregandoBtn({id, sel:false})   
        }, 300);
        response = r
    })
    return response;
}