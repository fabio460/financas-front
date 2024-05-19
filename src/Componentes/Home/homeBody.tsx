import React,{useEffect, useState} from 'react';
import { mesType, usuarioType } from '../../types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./home.css"
import { calculos, formatoMonetario, ignoreMaiusMinusAcent, ordenaLista, somaEntradas, somaSaidas, somaValores } from '../../metodosUteis';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { Checkbox, IconButton, Stack } from '@mui/material';
import { corDosItens, corVerde, corVermelho} from '../Cores';
import ModalAdicionarConta from './Modais/modalAdicionarContas';
import { inverterContaSelecionadaApi, selecionarTudoApi } from '../Api/contasApi';
import { setAtualizarRedux } from '../Redux/Reducers/atualizaRedux';
import ModalDeletarMes from './Modais/modalDeletarMes';
import Contas from './contas';
import ModalAdicionarMes from './Modais/modalAdicionarMes';

export default function HomeBody({id}:{id:string}) {
  const [mes, setMes] = useState<mesType[]>([])
  const [mesRef, setMesRef] = useState(localStorage.getItem("step")?parseInt(localStorage.getItem("step") as string):0)
  const [atualiza, setatualiza] = useState(false)
  const [loading, setloading] = useState(false)
  const [carregandoBtn, setCarregandoBtn] = useState({id:"",sel:false})
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
  const selecionarTudo = async(e:any)=>{
      const c = e.target?.checked
      if (c) {        
        await selecionarTudoApi(Mes.id,true)
        disp(setAtualizarRedux(!atual))
      } else {
        await selecionarTudoApi(Mes.id,false)
        disp(setAtualizarRedux(!atual))
      }
  }
  const resultados = calculos(Mes.contas)
  return (
    <div className='contasContainer'> 
      {
        loading ? <div>carregando tela...</div>:
        <div className='contasBody'>
          <div className='ListaDeContas'>
            <Stack direction="row"  sx={{mt:2, display:"flex", alignItems:"center"}} >
              <Checkbox onChange={selecionarTudo} defaultChecked/>
              <span>Selecionar tudo</span>
            </Stack>
            <Contas 
                Mes={Mes}
                atual={atual}
                disp={disp}
                handleAtualiza={handleAtualiza}
                handleChecked={handleChecked}
                carregandoBtn={carregandoBtn}
                setAtualizarRedux={setAtualizarRedux}
            />
          </div>
          <div className='subAppBar'>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
              <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={mesRef === 0 ? true : false}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <div style={{textAlign:"center", width:"90px"}}> {Mes?.mesReferente} </div>
              <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={mesRef === (usuario.mes.length - 1) ? true : false}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", background:""}}>
              <div style={{marginBottom:15, marginTop:5}}>
                <div style={{textAlign:"center", color:"grey", fontSize:12}}>Sobrou</div>
                <h2 style={{textAlign:"center", margin:0, color:somaValores(Mes.contas) < "0" ? "red" : ""}}>
                  {somaValores(Mes.contas)}            
                </h2>
                <div style={{color:resultados.cor, textAlign:"center"}}>
                  {
                    resultados.cor === "red" ? "Você esta no vermelho":"Suas dívidas estão comprometendo " + resultados.porcentagem + " do seu salário"
                  }
                </div>
              </div>
            </div>
            <Stack direction="row" spacing={1} sx={{ml:"0%"}} className='stack'>
              <ModalAdicionarConta mes={Mes} handleAtualiza={handleAtualiza}/>
              <ModalDeletarMes idMes={Mes.id as string} />
              <ModalAdicionarMes id={id}/>
            </Stack>
            <div style={{display:"flex",alignItems:"center", flexDirection:"column",marginTop:"20px"}}>
              <div style={{color:corVerde}}>Entradas: {formatoMonetario(somaEntradas(Mes.contas))}</div>
              <div  style={{color:corVermelho}}> Saídas: {formatoMonetario(somaSaidas(Mes.contas))}</div>
            </div>
          </div>
          <div className='subAppBarMobile'>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
              <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={mesRef === 0 ? true : false}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <div style={{textAlign:"center", width:"90px"}}> {Mes?.mesReferente} </div>
              <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={mesRef === (usuario.mes.length - 1) ? true : false}>
                <ArrowForwardIosIcon/>
              </IconButton>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", background:""}}>
              <div style={{marginBottom:15, marginTop:5}}>
                <div style={{textAlign:"center", color:"grey", fontSize:12}}>Sobrou</div>
                <h2 style={{textAlign:"center", margin:0, color:somaValores(Mes.contas) < "0" ? "red" : ""}}>
                  {somaValores(Mes.contas)}            
                </h2>
                <div style={{color:resultados.cor, textAlign:"center"}}>
                  {
                    resultados.cor === "red" ? "Você esta no vermelho":"Suas dívidas estão comprometendo " + resultados.porcentagem + " do seu salário"
                  }
                </div>
              </div>
            </div>
            <Stack direction="row" spacing={1} sx={{ml:"0%"}} className='stack'>
              <ModalAdicionarConta mes={Mes} handleAtualiza={handleAtualiza}/>
              <ModalDeletarMes idMes={Mes.id as string} />
              <ModalAdicionarMes id={id}/>
            </Stack>
          </div>
          <div style={{display:"flex",alignItems:"center", flexDirection:"column",marginTop:"20px"}}>
              <div style={{color:corVerde}}>Entradas: {formatoMonetario(somaEntradas(Mes.contas))}</div>
              <div  style={{color:corVermelho}}> Saídas: {formatoMonetario(somaSaidas(Mes.contas))}</div>
            </div>
          <div className='ListaDeContasMobile'>
            <Stack direction="row"  sx={{mt:2, display:"flex", alignItems:"center"}} >
              <Checkbox onChange={selecionarTudo} defaultChecked/>
              <span>Selecionar tudo</span>
            </Stack>
            <Contas 
                Mes={Mes}
                atual={atual}
                disp={disp}
                handleAtualiza={handleAtualiza}
                handleChecked={handleChecked}
                carregandoBtn={carregandoBtn}
                setAtualizarRedux={setAtualizarRedux}
            />
          </div>
        </div>
      }
    </div>
  );
}
  
