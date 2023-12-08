import React,{useState} from 'react'
import "./carousel.css"
import { mesType } from '../../../types'
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardContent from '@mui/material/CardContent';
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
  return (
    <div>
      <div className='slides'>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <IconButton sx={{color:corDosItens}} aria-label="delete" onClick={anterior} disabled={active === 0 ? true : false}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <div style={{textAlign:"center", width:"90px"}}>{mes[active]?.mesReferente}</div>
        <IconButton sx={{color:corDosItens}} onClick={proximo} disabled={active === (mes.length - 1) ? true : false}>
          <ArrowForwardIosIcon/>
        </IconButton>
      </div>
      <div style={{textAlign:"center",marginTop:"20px"}}>Sobra {formatoMonetario(getSobra(mes[active]?.ganhos, mes[active]?.contas_A_Pagar))}</div>

        <div className={`slideContainer`} style={{marginLeft:`${-active*400}px`}}>
           { mes.length === 0 ? <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>Não há dados</div>:
             mes.map((e,key)=>{
               return <div key={key} className='slide' style={{color:"black"}}>
                <Card sx={{ minWidth: 275 }}>
                  <div style={{display:"flex", justifyContent:"flex-end", margin:"3px"}}>
                    <ModalDeletarMes idMes={e.id} />
                  </div>
                  <CardContent>
                    <ListaEntradasSaidas list={e.ganhos} tipo={"entrada"} handleAtualiza={handleAtualiza}/>
                    <ListaEntradasSaidas list={e.contas_A_Pagar} tipo={"saida"} handleAtualiza={handleAtualiza}/>
                  </CardContent>
                  <CardActions>
                    <ModalAdicionarEntradas mes={e} handleAtualiza={handleAtualiza}/>
                    <ModalAdicionarConta mes={e}  handleAtualiza={handleAtualiza}/>
                  </CardActions>
                </Card>
              </div>
            })
           }
         </div>
      </div>
    </div>
  )
}
