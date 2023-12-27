export type usuarioLogadoType={
    id:string
    email:string
    nome:string
    senha:string

}

export type usuarioType = {
    id:string
    email:string
    nome:string
    senha:string
    mes:mesType2[]
}

export type contasType = {
    id:string
    nome:string
    valor:number
    idMes:string
    selecionado:boolean
    tipo:string
}

export type mesType2 = {
    id:string
    contas:contasType[]
    idDoUsuario:string
    mesReferente:string
    numero:number
}

export type mesType ={
    id: string
    idDoUsuario:string
    mesReferente:string
    contas_A_Pagar:{
        id:string
        nome:string
        valor:number
        idMes:string
    }[]
    ganhos:{
        id:string
        nome:string
        valor:number
        idMes:string
    }[]
}





export type entradasSaidasType={
    id:string
    nome:string
    valor:number
    idMes:string
}

export type checkedListType={
    checked:boolean,
    elem:entradasSaidasType
}