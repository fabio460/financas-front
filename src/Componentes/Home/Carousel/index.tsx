import React,{useEffect, useRef, useState} from 'react'
import "./carousel.css"
import { checkedListType, mesType } from '../../../types'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListaEntradasSaidas from '../listaEntradasSaidas';
import ModalAdicionarEntradas from '../modalAdicionarEntradas';
import ModalAdicionarConta from '../modalAdicionarConta';
import IconButton from '@mui/material/IconButton';
import ModalDeletarMes from '../modalDeletarMes';
import { formatoMonetario, getSobra, ordenaLista } from '../../../metodosUteis';
import { corDosItens } from '../../Cores';
import { AppBar, Input, Toolbar, Typography } from '@mui/material';
import FooterBar from '../footerBar';
import { useAppDispatch } from '../../Redux/hooks';
import { setSearch } from '../../Redux/Reducers/searchReducer';
import CarouselLoading from './carouselLoading';

export default function Carousel({mes, handleAtualiza}:{mes:mesType[],handleAtualiza:any}) {
  const [active, setActive] = useState(localStorage.getItem("step") ? parseInt(localStorage.getItem("step") as string):0)
  const [loading, setloading] = useState(false)
  const [sizeSlide, setsizeSlide] = useState(-1)
  const minhaDivRef = useRef<any>(null);
  
  const proximo = ()=>{
    if (active < ( mes.length - 1)) {      
      localStorage.setItem("step",JSON.stringify(active + 1))
      setActive(active + 1)
    }
  }
  const anterior = ()=>{
    if (active > 0) {      
      localStorage.setItem("step",JSON.stringify(active - 1))
      setActive(active - 1)
    }
  }
  
    
  setTimeout(() => {
    
    const larguraDaDiv = minhaDivRef.current?.offsetWidth;
    if (minhaDivRef) {
      setsizeSlide(larguraDaDiv)
    }
  }, 500);

  const sliderStyle = {
    "marginLeft":`${sizeSlide && -active*sizeSlide}px`,
    margin:"auto",
  }
  const dispach = useAppDispatch()
  const handleSearch = (e:any)=>{
   dispach(setSearch(e.target.value))
  }
  return (
    <div >
      {
        (sizeSlide === -1) ? 
        <div className='slides'>
          <CarouselLoading/>
        </div>:
        loading ? <div className='slides'>
          <CarouselLoading/>
        </div>:
        <div className='slides' ref={minhaDivRef}>
          {
            mes.length !== 0 && 
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
              <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={active === 0 ? true : false}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <div style={{textAlign:"center", width:"90px"}}> {mes[active]?.mesReferente} </div>
              <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={active === (mes.length - 1) ? true : false}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </div>
          }
          {
            mes.length !== 0 && <div style={{textAlign:"center", marginTop:"10px"}}>Sobra {formatoMonetario(getSobra(mes[active]?.ganhos, mes[active]?.contas_A_Pagar))}</div>
          }
          {
            mes.length === 0 ? <div className='carouselNaoHaDados'>Não há dados, adicione o mês no botão laranja abaixo!</div>:
            <div  className={`slideContainer`} style={sliderStyle}>
              { 
                mes?.map((e,key)=>{
                  return <div key={key} className='slide' style={{color:""}}>
                    <div>
                      {e.mesReferente}
                      <div style={{display:"flex", justifyContent:"flex-end", margin:"3px"}}>
                        <ModalDeletarMes idMes={e.id} id={e.id}/>
                      </div>
                      <div className='sliderList'>
                        <h3 style={{color:"", textAlign:"center"}}>{e?.mesReferente}</h3>
                        <ListaEntradasSaidas  list={e.ganhos} tipo={"entrada"} handleAtualiza={handleAtualiza}/>
                        <ListaEntradasSaidas  list={e.contas_A_Pagar} tipo={"saida"} handleAtualiza={handleAtualiza}/>
                      </div>                    
                      {/* <AppBar position="absolute"  color="default" 
                         sx={{ top: 'auto', bottom: 0, display:"", zIndex:1, paddingBottom:"10px" }}>
                          <Toolbar>
                          </Toolbar>
                      </AppBar> */}
                      <div style={{position:"relative", background:"inherit",top: '10px', bottom: 0, display:"flex", zIndex:1, paddingBottom:"10px"}}>
                            <ModalAdicionarEntradas mes={e} handleAtualiza={handleAtualiza}/>
                            <ModalAdicionarConta mes={e}  handleAtualiza={handleAtualiza}/>
                            <Input placeholder='busca' onChange={handleSearch}/>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          }
        </div>
      }
    </div>
  )
}
