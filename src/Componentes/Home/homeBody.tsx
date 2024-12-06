import React,{useEffect, useState} from 'react';
import { contasType, mesType, mesType2, usuarioType } from '../../types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./home.css"
import { calculos, filtrarContaDeCartoes, formatoMonetario, getPorcentagem, ignoreMaiusMinusAcent, ordenaLista, ordenaListaPorValor, somaEntradas, somaSaidas, somaValores } from '../../metodosUteis';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { Avatar, Checkbox, IconButton, Stack } from '@mui/material';
import { corDosItens, corVerde, corVermelho} from '../Cores';
import ModalAdicionarConta from './Modais/modalAdicionarContas';
import { inverterContaSelecionadaApi, selecionarTudoApi } from '../Api/contasApi';
import { setAtualizarRedux } from '../Redux/Reducers/atualizaRedux';
import ModalDeletarMes from './Modais/modalDeletarMes';
import Contas from './contas';
import ModalAdicionarMes from './Modais/modalAdicionarMes';
import CompressIcon from '@mui/icons-material/Compress';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { emojiAmareloNormal, emojiLaranjaPreocupado, emojiVerdeFeliz, emojiVermelhoTriste } from './emojis';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
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
  let MesesOrdenados = ordenaLista(usuario.mes)
  let Mes:mesType | mesType2 = MesesOrdenados[mesRef] as mesType2
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
  const [ordem, setOrdem] = useState("nulo")
  const listaDeContas = ordenaListaPorValor(Mes.contas as contasType[],ordem)
  const resultados = calculos(listaDeContas)
  const ordemAsc = ()=>{
     setOrdem("asc")
  }
  const ordemDesc = ()=>{
    setOrdem("desc")
  }
  const ordemNula = ()=>{
    setOrdem("nulo")
  }

  function Emoji(por:number) {
    if ((por > 0 && por < 50)) {
      return <Avatar sx={{width:70, height:70}}  src={emojiVerdeFeliz}/>
    }
    if ((por >= 50 && por < 70)) {
      return <Avatar sx={{width:70, height:70}}  src={emojiAmareloNormal} />
    }
    if ((por >= 70 && por < 90)) {
      return <Avatar sx={{width:70, height:70}}  src={emojiLaranjaPreocupado} />
    }
    if ((por > 90 || por < 0 )) {
      return <Avatar sx={{width:70, height:70}}  src={emojiVermelhoTriste} />
    }
    return <div></div>
  }
  const gastosDoCartaoDeCred =filtrarContaDeCartoes(listaDeContas)
  
  return (
    <div className='contasContainer'> 
      {
        loading ? <div>carregando tela...</div>:
        <div className='contasBody'>
          <div className='ListaDeContas'>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <Stack direction="row"  sx={{mt:2, display:"flex", alignItems:"center"}} >
                <Checkbox onChange={selecionarTudo} defaultChecked/>
                <span>Selecionar tudo</span>
              </Stack>
              {
                ordem === "nulo" ? 
                  <IconButton onClick={ordemDesc}>
                    <CompressIcon/>
                  </IconButton>
                :
                ordem === "desc" ?
                  <IconButton onClick={ordemAsc}>
                    <ArrowUpwardIcon/>
                  </IconButton>
                :
                  <IconButton onClick={ordemNula}>
                    <ArrowDownwardIcon/>
                  </IconButton>    
              }
            </div>
            <Contas 
                Mes={listaDeContas}
                atual={atual}
                disp={disp}
                handleAtualiza={handleAtualiza}
                handleChecked={handleChecked}
                carregandoBtn={carregandoBtn}
                setAtualizarRedux={setAtualizarRedux}
            />
          </div>
          <div className='subAppBar'>
            <h3 style={{textAlign:"center"}}>{Mes.Ano}</h3>
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
                <h2 style={{textAlign:"center", margin:0, color:somaValores(listaDeContas) < "0" ? "red" : ""}}>
                  {somaValores(listaDeContas)}            
                </h2>
                <div style={{color:resultados.cor, textAlign:"center"}}>
                  <div style={{display:"flex", justifyContent:"center"}}>
                      {Emoji(getPorcentagem(resultados.porcentagem))}
                  </div>
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
              <div>Gastos com cartôes de crédito {gastosDoCartaoDeCred}</div>
            </div>
          </div>
          {/* <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
            <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={mesRef === 0 ? true : false}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <div style={{textAlign:"center", width:"90px"}}> {Mes?.mesReferente} </div>
            <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={mesRef === (usuario.mes.length - 1) ? true : false}>
              <ArrowForwardIosIcon/>
            </IconButton>
          </div> */}
          <div className='subAppBarMobile'>

            <AccordionUsage listaDeContas={listaDeContas} Mes={Mes} anterior={anterior} mesRef={mesRef} proximo={proximo} usuario={usuario}>
              <div>
                <div className='subAppBarMobile'>
                  <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", background:""}}>
                    <div style={{marginBottom:15, marginTop:5}}>
                      {/* <div style={{textAlign:"center", color:"grey", fontSize:12}}>Sobrou</div>
                      <h2 style={{textAlign:"center", margin:0, color:somaValores(Mes.contas) < "0" ? "red" : ""}}>
                        {somaValores(listaDeContas)}            
                      </h2> */}
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
              <div className='itemBodyMobile' style={{display:"flex",alignItems:"center", flexDirection:"column",marginTop:"20px"}}>
                  <div style={{color:corVerde}}>Entradas: {formatoMonetario(somaEntradas(Mes.contas))}</div>
                  <div  style={{color:corVermelho}}> Saídas: {formatoMonetario(somaSaidas(Mes.contas))}</div>
                  <div>Gastos com cartôes de crédito {gastosDoCartaoDeCred}</div>
              </div>

              </div>
            </AccordionUsage>
          </div>
          <div></div>
          <div className='ListaDeContasMobile'>
            <Stack direction="row"  sx={{mt:2, display:"flex", alignItems:"center"}} >
              <Checkbox onChange={selecionarTudo} defaultChecked/>
              <span>Selecionar tudo</span>
            </Stack>
            <Contas 
                Mes={listaDeContas}
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
  
function AccordionUsage({children, anterior, Mes, mesRef, proximo, usuario, listaDeContas}:{children:any,listaDeContas:any, anterior:any,mesRef:any, Mes:any, proximo:any, usuario:any}) {
  return (
    <div>
      
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion> */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <h3 style={{textAlign:"center", margin:0, color:somaValores(listaDeContas) < "0" ? "red" : ""}}>
            Sobrou {somaValores(listaDeContas)}            
          </h3>
        </AccordionSummary>
        
        <AccordionDetails>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"0px"}}>
            <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={mesRef === 0 ? true : false}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <div style={{textAlign:"center", width:"90px"}}> {Mes?.mesReferente} </div>
            <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={mesRef === (usuario.mes.length - 1) ? true : false}>
              <ArrowForwardIosIcon/>
            </IconButton>
          </div>
           {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
