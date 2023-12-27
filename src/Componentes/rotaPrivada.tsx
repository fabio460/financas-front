import React, { useState, useEffect, ReactNode } from 'react'
import { Navigate } from "react-router-dom";
import { autenticadoApi } from './Api/autenticacao';
import { useAppDispatch, useAppSelector } from './Redux/hooks';
import { usuarioAutenticado } from './Redux/Reducers/usuarioRedux';
import { Box, CircularProgress } from '@mui/material';
import { listarUsuarioPorIdApi } from './Api/usuarioApi';
import { setUsuario } from './Redux/Reducers/usuarioAutenticadoReducer';


export default function RotaPrivada({children}:{children:ReactNode}) {
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false)
  const dispatch = useAppDispatch()
  const j = localStorage.getItem("token") || ""
  let token = j.split('"')[1]
  const atual = useAppSelector(state=>state.atualizaRedux.atual)
  useEffect(()=>{
    async function Autentica(jwt:string) {
      setCarregando(true)
      const res:any = await autenticadoApi(jwt);
      const id = res.usuario?.usuario.id
      const user:any = await listarUsuarioPorIdApi(id)
      dispatch(setUsuario(user))
      if (res.cond === "autenticado") {
          setAutenticado(true)
          dispatch(usuarioAutenticado(res.usuario.usuario))
      }
      setCarregando(false)
    }
    Autentica(token)
  },[token, dispatch])

  useEffect(()=>{
    async function atualizaUsuario(jwt:string) {
      const res:any = await autenticadoApi(jwt);
      const id = res.usuario?.usuario.id
      const user:any = await listarUsuarioPorIdApi(id)
      dispatch(setUsuario(user))
      if (res.cond === "autenticado") {
          setAutenticado(true)
          dispatch(usuarioAutenticado(res.usuario.usuario))
      }
    }
    atualizaUsuario(token)
  },[atual])
  if (carregando) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center", height:"100vh" }}>
        <CircularProgress />
      </Box>
    )
  } else {    
      if (autenticado) {
          return (
            <div>{children}</div>
          )
        
      } else {
        return(
            <Navigate to={"/login"}/>
        )
      }
  }
}
