import { contasType, entradasSaidasType, mesType } from "./types";
import ImageIcon from '@mui/icons-material/Image';

export const emailValido = (email:string)=>{
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const emailValido = regEmail.test(email);
    return emailValido;
}

export const senhaValida = (senha:string)=>{
    const regSenha = /^[a-zA-Z0-9]{5}/;
    const senhaValida = regSenha.test(senha)
    return senhaValida;
}

export const nomeValido = (nome:string)=>{
    const regNome = /^[a-zA-Z]{3}/
    const nomeValido = regNome.test(nome)
    return nomeValido;
}
export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

export function getSobra(entradas:entradasSaidasType[], saidas:entradasSaidasType[]) {


    let array = ["teste 1","saida 2","65768f191ca757a05621ba76"]

    let accEnt = 0
    array.map(a=>{
        return entradas?.map((e)=>{
            return e.nome === a ? accEnt-=e.valor : accEnt;
        },0)
    })
    let difEnt = accEnt*(-1)

    let accSai = 0
    array.map(a=>{
        return saidas?.map((e)=>{
            return e.nome === a ? accSai-=e.valor : accSai;
        },0)
    })
    
    let difSai = accSai*(-1)

    let entrada = entradas?.reduce((acc, item)=>{
       return acc+= item.valor;
    },0)
    let saida = saidas?.reduce((acc, item)=>{
        return acc+= item.valor;
    },0)
    return (entrada - difEnt) - (saida - difSai);
}

export const ignoreMaiusMinusAcent = (nome:string)=>{
   return nome.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const ordenaLista = (mes:mesType[])=>{
   const mesAdd = mes.map(e=>{
    switch (e.mesReferente) {
        case "Janeiro":
            return {num:1,e} 
            break;
        case "Fevereiro":
            return {num:2,e}
            break;    
        case "Março":
            return {num:3,e}     
        case "Abril":
            return {num:4,e} 
        case "Maio":
            return {num:5,e} 
        case "Junho":
            return {num:6,e} 
        case "Julho":
            return {num:7,e} 
        case "Agosto":
            return {num:8,e}   
        case "Setembro":
            return {num:9,e}     
        case "Outubro":
            return {num:10,e} 
        case "Novembro":
            return {num:11,e} 
        case "Dezembro":
            return {num:12,e}  
        default:
            break;
    }
   }) 
   const ordenado = mesAdd.sort((a,b)=>{
    return (a?.num as number) < (b?.num as number) ? -1 : (a?.num as number) > (b?.num as number) ? 1 : 0
   })
   return ordenado.map(e=>{
    return e?.e
   })
}

export const somaValores = (array:contasType[])=>{
    const soma = array.reduce((acc, elem)=>{
        return elem.selecionado ? 
           elem.tipo === "entrada" ?
             acc+=elem.valor: acc-=elem.valor:acc+=0
    },0)
    return formatoMonetario(soma)
}
export const trocaVirgulaPorPonto = (valor:string)=>{
    const  strComPonto = valor.replace(",",".")
    return parseFloat(strComPonto)
 }