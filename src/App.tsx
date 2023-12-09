import React,{} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaPrivada from './Componentes/rotaPrivada';
import Login from './Componentes/Login/login';
import Cadastro from './Componentes/Cadastro/cadastro';
import Home from './Componentes/Home/home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <main>
      <div className="">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={
                <RotaPrivada><Home/></RotaPrivada>
              }/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/cadastro' element={<Cadastro/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    </main>
  </ThemeProvider>
  );
}

export default App;
