import { entradasSaidasType } from "./types";
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

export function getSobra(entradas:entradasSaidasType, saidas:entradasSaidasType) {
    let entrada = entradas?.reduce((acc, item)=>{
        return acc+= item.valor;
    },0)
    let saida = saidas?.reduce((acc, item)=>{
        return acc+= item.valor;
    },0)
    return entrada - saida;
}

export const ignoreMaiusMinusAcent = (nome:string)=>{
   return nome.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}