import React,{useEffect, useRef, useState} from 'react'
import "./carousel.css"
import { mesType } from '../../../types'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListaEntradasSaidas from '../listaEntradasSaidas';
import ModalAdicionarEntradas from '../modalAdicionarEntradas';
import ModalAdicionarConta from '../modalAdicionarConta';
import IconButton from '@mui/material/IconButton';
import ModalDeletarMes from '../modalDeletarMes';
import { formatoMonetario, getSobra } from '../../../metodosUteis';
import { corDosItens } from '../../Cores';

export default function Carousel({mes, handleAtualiza}:{mes:mesType[],handleAtualiza:any}) {
  const [active, setActive] = useState(localStorage.getItem("step") ? parseInt(localStorage.getItem("step") as string):0)

  const proximo = ()=>{
    if (active < ( mes.length - 1)) {      
      setActive(active + 1)
      localStorage.setItem("step",JSON.stringify(active + 1))
    }
  }
  const anterior = ()=>{
    if (active > 0) {      
      setActive(active - 1)
      localStorage.setItem("step",JSON.stringify(active - 1))
    }
  }
  
  const [sizeSlide, setsizeSlide] = useState()
  const minhaDivRef = useRef<any>(null);
    setTimeout(() => {
      if (minhaDivRef) {
        const larguraDaDiv = minhaDivRef.current?.offsetWidth;
        setsizeSlide(larguraDaDiv)
      }
    }, 500);
    if (sizeSlide) {
      console.log("tam "+sizeSlide)
    }  
    const sliderStyle = {
      "marginLeft":`${sizeSlide && -active*sizeSlide}px`,
      margin:"auto",
    }
  return (
    <div >
      <div className='slides' ref={minhaDivRef}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={active === 0 ? true : false}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <div style={{textAlign:"center", width:"90px"}}>{mes[active]?.mesReferente}</div>
          <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={active === (mes.length - 1) ? true : false}>
            <ArrowForwardIosIcon/>
          </IconButton>
        </div>
        <div style={{textAlign:"center", marginTop:"10px"}}>Sobra {formatoMonetario(getSobra(mes[active]?.ganhos, mes[active]?.contas_A_Pagar))}</div>
        <div  className={`slideContainer`} style={sliderStyle}>
           { mes.length === 0 ? <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>Não há dados</div>:
             mes.map((e,key)=>{
               return <div key={key} className='slide' style={{color:"black"}}>
                <div >
                  <div style={{display:"flex", justifyContent:"flex-end", margin:"3px"}}>
                    <ModalDeletarMes idMes={e.id} />
                  </div>
                  <div className='sliderList'>
                    <ListaEntradasSaidas list={e.ganhos} tipo={"entrada"} handleAtualiza={handleAtualiza}/>
                    <ListaEntradasSaidas list={e.contas_A_Pagar} tipo={"saida"} handleAtualiza={handleAtualiza}/>
                  </div>
                  <div className='slidesButtom'>
                    <ModalAdicionarEntradas mes={e} handleAtualiza={handleAtualiza}/>
                    <ModalAdicionarConta mes={e}  handleAtualiza={handleAtualiza}/>
                  </div>
                </div>
              </div>
            })
           }
         </div>
      </div>
    </div>
  )
}
