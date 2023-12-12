import React,{useEffect, useState} from 'react';
import { mesType } from '../../types';
import { listarMesApi } from '../Api/mesApi';
import "./home.css"
import Carousel from './Carousel';
import { ignoreMaiusMinusAcent, ordenaLista } from '../../metodosUteis';
import { useAppSelector } from '../Redux/hooks';

function Contas({id}:{id:string}) {
  const [mes, setMes] = useState<mesType[]>([])
  const [atualiza, setatualiza] = useState(false)
  const [loading, setloading] = useState(false)
  useEffect(()=>{
    async function getMes() {
      setloading(true)
      const res:any = await listarMesApi(id)
      setMes(res)
      setloading(false)
    }
    getMes()
  },[atualiza])
  const handleAtualiza = ()=>{
    setatualiza(!atualiza)
  }
  const search = useAppSelector(state=>state.searchReducer.search)
  let mesOrdenado = ordenaLista(mes) as mesType[]
  let listaFiltrada = mesOrdenado.map(((e, key)=>{
    let contas_A_Pagar = e.contas_A_Pagar.filter(c=>{
      if (ignoreMaiusMinusAcent(c.nome).includes(ignoreMaiusMinusAcent(search))) {
        return c
      }
    })
    let ganhos = e.ganhos.filter(c=>{
      if (ignoreMaiusMinusAcent(c.nome).includes(ignoreMaiusMinusAcent(search))) {
        return c
      }
    })
    return {
      id:e.id,
      contas_A_Pagar,
      ganhos,
      idDoUsuario:e.idDoUsuario,
      mesReferente:e.mesReferente
    }
  }))

  return (
    <div> 
      {
        // loading ? <div>carregando tela...</div>:
       <Carousel mes={listaFiltrada} handleAtualiza={handleAtualiza}/>
      }
    </div>
  );
}

export default Contas;
