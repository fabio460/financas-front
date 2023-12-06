export type usuarioLogadoType={
    id:string
    email:string
    nome:string
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
}[]