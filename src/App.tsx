import React,{} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RotaPrivada from './Componentes/rotaPrivada';
import Login from './Componentes/Login/login';
import Cadastro from './Componentes/Cadastro/cadastro';
import Home from './Componentes/Home/home';

function App() {
  return (
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
  );
}

export default App;
