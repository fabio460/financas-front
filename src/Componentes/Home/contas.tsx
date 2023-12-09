import React,{useEffect, useState} from 'react';
import { mesType } from '../../types';
import { listarMesApi } from '../Api/mesApi';
import "./home.css"
import Carousel from './Carousel';

function Contas() {
  const [mes, setMes] = useState<mesType[]>([])
  const [atualiza, setatualiza] = useState(false)
  useEffect(()=>{
    async function getMes() {
      const res:any = await listarMesApi()
      setMes(res)
    }
    getMes()
  },[atualiza])
  const handleAtualiza = ()=>{
    setatualiza(!atualiza)
  }

  return (
    <div>
      <Carousel mes={mes} handleAtualiza={handleAtualiza}/>
    </div>
  );
}

export default Contas;
