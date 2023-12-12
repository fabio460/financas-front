import React, { useState, useEffect, ReactNode } from 'react'
import { Navigate } from "react-router-dom";
import { autenticadoApi } from './Api/autenticacao';
import { useAppDispatch } from './Redux/hooks';
import { usuarioAutenticado } from './Redux/Reducers/usuarioRedux';
import { Box, CircularProgress } from '@mui/material';
export default function RotaPrivada({children}:{children:ReactNode}) {
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false)
  const dispatch = useAppDispatch()
  const j = localStorage.getItem("token") || ""
  let token = j.split('"')[1]
  useEffect(()=>{
    async function Autentica(jwt:string) {
        setCarregando(true)
      const res:any = await autenticadoApi(jwt);
      if (res.cond === "autenticado") {
          setAutenticado(true)
          dispatch(usuarioAutenticado(res.usuario.usuario))
      }
      
      setCarregando(false)
    }
    Autentica(token)
  },[token, dispatch])
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
