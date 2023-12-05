import React from 'react'
import { useAppSelector } from '../Redux/hooks'
import { usuarioLogadoType } from '../../types'
import { useNavigate } from "react-router-dom";
import { deletarUsuarioApi } from '../Api/usuarioApi';
export default function Home() {
  const usuarioLogado:usuarioLogadoType = useAppSelector(state=>state.usuarioRedux.usuario) 
  const n = useNavigate() 
  const logouf = ()=>{
    localStorage.removeItem("token")
    n("/login")
  }
  async function deletarUsuario(){
    const res = await deletarUsuarioApi(usuarioLogado.id)
    alert(res)
    localStorage.removeItem("token")
    n("/login")
  }
  return (
    <div>
        <h2>Bem vindo {usuarioLogado.nome}</h2>
        <button onClick={logouf}>sair</button>
        <button onClick={()=> deletarUsuario()}>deletar conta</button>
    </div>
  )
}
