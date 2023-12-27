import React,{useEffect, useState} from 'react';
import { mesType, usuarioLogadoType, usuarioType } from '../../types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { listarMesApi } from '../Api/mesApi';
import WorkIcon from '@mui/icons-material/Work';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WifiIcon from '@mui/icons-material/Wifi';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import "./home.css"
import { formatoMonetario, ignoreMaiusMinusAcent, ordenaLista, somaValores } from '../../metodosUteis';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { Avatar, Checkbox, Chip, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import { corDosItens, corVerde, corVermelho } from '../Cores';
import ModalAdicionarConta from './Modais/modalAdicionarContas';
import FadeMenu from './menu';
import { atualizarContasApi, inverterContaSelecionadaApi } from '../Api/contasApi';
import { setAtualizarRedux } from '../Redux/Reducers/atualizaRedux';
import BtnLoading from '../btnLoading';
import ModalDeletarMes from './Modais/modalDeletarMes';

function Contas({id}:{id:string}) {
  const [mes, setMes] = useState<mesType[]>([])
  const [mesRef, setMesRef] = useState(localStorage.getItem("step")?parseInt(localStorage.getItem("step") as string):0)
  const [atualiza, setatualiza] = useState(false)
  const [loading, setloading] = useState(false)
  const [carregandoBtn, setCarregandoBtn] = useState({id:"",sel:false})

  // useEffect(()=>{
  //   async function getMes() {
  //     setloading(true)
  //     const res:any = await listarMesApi(id)
  //     setMes(res)
  //     setloading(false)
  //   }
  //   getMes()
  // },[atualiza])
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
  const usuario:usuarioType = useAppSelector(state=>state.usuarioAutenticadoReducer.usuario)
  useEffect(()=>{
    async function getMes() {
      setloading(true)
   
      
      setloading(false)
    }
    getMes()
  },[atualiza])
  let Mes = usuario.mes[mesRef]
  const proximo = ()=>{
    if (mesRef < ( usuario.mes.length - 1)) {      
      localStorage.setItem("step",JSON.stringify(mesRef + 1))
      setMesRef(mesRef + 1)
    }
  }
  const anterior = ()=>{
    if (mesRef > 0) {      
      localStorage.setItem("step",JSON.stringify(mesRef - 1))
      setMesRef(mesRef - 1)
    }
  }

  const disp = useAppDispatch()
  const atual = useAppSelector(state=>state.atualizaRedux.atual)
  const handleChecked = async(id:string)=>{
    setCarregandoBtn({id,sel:true})
    inverterContaSelecionadaApi(id, disp, setAtualizarRedux, atual, setCarregandoBtn)
  }
  return (
    <div className='contasContainer'> 
      {
        loading ? <div>carregando tela...</div>:
        <div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
              <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={mesRef === 0 ? true : false}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <div style={{textAlign:"center", width:"90px"}}> {Mes?.mesReferente} </div>
              <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={mesRef === (usuario.mes.length - 1) ? true : false}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </div>
            <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                <h2 style={{display:"flex", justifyContent:""}}>{somaValores(Mes.contas)}</h2>
            </div>
            <Stack direction="row" spacing={1} sx={{ml:"0%"}} className='stack'>
              <ModalAdicionarConta mes={Mes} handleAtualiza={handleAtualiza}/>
              <ModalDeletarMes idMes={Mes.id as string} />
            </Stack>
            <div className='listaContas'>
              {
                Mes.contas.map((c, keyC)=>{
                  return <div key={keyC}>
                    <div>
                      <ListItem sx={{p:0, display:""}}>
                          <div style={{color:c.tipo==="entrada"? corVerde : corVermelho ,display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                              {
                                (carregandoBtn.id === c.id && carregandoBtn.sel) ? <BtnLoading marginV={"8.5"}/>:
                                <Checkbox checked={c.selecionado} onChange={e=> handleChecked(c.id)}/>
                              }
                              <ListItemAvatar>
                                  <Avatar sx={{bgcolor:corDosItens}}>
                                      {
                                      ignoreMaiusMinusAcent(c.nome).includes(("cartao")) || ignoreMaiusMinusAcent(c.nome).includes(("fatura")) ? <CreditCardIcon  />:
                                      ignoreMaiusMinusAcent(c.nome).includes("aluguel") ? <MapsHomeWorkIcon />:
                                      ignoreMaiusMinusAcent(c.nome).includes("internet") ? <WifiIcon />:
                                      ignoreMaiusMinusAcent(c.nome).includes("salario") ? <CurrencyExchangeIcon/> :
                                      ignoreMaiusMinusAcent(c.nome).includes("gas") ? <PropaneTankIcon />:
                                      ignoreMaiusMinusAcent(c.nome).includes("luz") ? <EmojiObjectsIcon />:
                                      ignoreMaiusMinusAcent(c.nome).includes("tv") || ignoreMaiusMinusAcent(c.nome).includes("genesio")?<LiveTvIcon />:
                                      ignoreMaiusMinusAcent(c.nome).includes("dizimo") ? <RequestQuoteIcon />:
                                      <WorkIcon/>
                                      }
                                  </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={c.nome} secondary={formatoMonetario(c.valor)} />
                          </div>
                          <FadeMenu 
                            id={c.id}
                            tipo={c.tipo} 
                            handleAtualiza={handleAtualiza} 
                            elem={c}
                            disp={disp} 
                            setAtualizarRedux={setAtualizarRedux}
                            atual={atual}  
                          />
                      </ListItem>
                      <Divider sx={{bgcolor:corDosItens, height:"1px", margin:"0px 5px",}}/>
                    </div>
                  </div>
                })
              }
            </div>
        </div>
      }
    </div>
  );
}
  
export default Contas;
