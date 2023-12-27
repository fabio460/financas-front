import React, { useState } from 'react'
import { useAppSelector } from '../Redux/hooks'
import { usuarioLogadoType } from '../../types'
import { useNavigate } from "react-router-dom";
import { deletarUsuarioApi, listarUsuarioPorIdApi } from '../Api/usuarioApi';
import ModalAdicionarMes from './Modais/modalAdicionarMes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Contas from './contas';
import ResponsiveAppBar from '../AppBar';
export default function Home() {
  const usuarioLogado:usuarioLogadoType = useAppSelector(state=>state.usuarioRedux.usuario) 

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [dark, setDark] = useState<any>(localStorage.getItem("dark") ? localStorage.getItem("dark"):false)
  const usuario:usuarioLogadoType = useAppSelector(state=>state.usuarioAutenticadoReducer.usuario)

  return (
    <ThemeProvider theme={dark && darkTheme}>
    <CssBaseline />
    <main>
      <div>
          <ResponsiveAppBar usuario={usuarioLogado} dark={dark} setDark={setDark}/>
          <Contas id={usuarioLogado.id} />
          <ModalAdicionarMes id={usuarioLogado.id}/>
      </div>
    </main>
  </ThemeProvider>
  )
}
