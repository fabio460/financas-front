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