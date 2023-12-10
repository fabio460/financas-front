import React,{useEffect, useState} from 'react';
import { mesType } from '../../types';
import { listarMesApi } from '../Api/mesApi';
import "./home.css"
import Carousel from './Carousel';
import { ordenaLista } from '../../metodosUteis';

function Contas() {
  const [mes, setMes] = useState<mesType[]>([])
  const [atualiza, setatualiza] = useState(false)
  const [loading, setloading] = useState(false)
  useEffect(()=>{
    async function getMes() {
      setloading(true)
      const res:any = await listarMesApi()
      setMes(res)
      setloading(false)
    }
    getMes()
  },[atualiza])
  const handleAtualiza = ()=>{
    setatualiza(!atualiza)
  }
  let mesOrdenado = ordenaLista(mes) as mesType[]
  return (
    <div> 
      {
        // loading ? <div>carregando tela...</div>:
       <Carousel mes={mesOrdenado} handleAtualiza={handleAtualiza}/>
      }
    </div>
  );
}

export default Contas;
