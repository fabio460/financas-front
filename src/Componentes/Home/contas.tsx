import React, { useState } from 'react'
import { contasType, mesType2 } from '../../types'
import { Avatar, Checkbox, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { corDizimo, corDosItens, corVerde, corVermelho } from '../Cores'
import BtnLoading from '../btnLoading'
import { formatoMonetario, ignoreMaiusMinusAcent, ordenaListaPorValor } from '../../metodosUteis'
import WorkIcon from '@mui/icons-material/Work';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WifiIcon from '@mui/icons-material/Wifi';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FadeMenu from './menu'

export default function Contas({Mes, atual, disp, handleAtualiza, handleChecked, carregandoBtn, setAtualizarRedux}:{Mes?:contasType[], handleChecked?:any, handleAtualiza?:any, disp?:any, atual?:any, carregandoBtn:any, setAtualizarRedux:any}) {
 
  return (
    <div className='listaContas'>
    {
      Mes?.map((c, keyC)=>{
        return <div key={keyC}>
          <div>
            <ListItem sx={{p:0, display:""}}>
                <div style={{display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                    {
                      (carregandoBtn.id === c.id && carregandoBtn.sel) ? <BtnLoading marginV={"8.5"}/>:
                      <Checkbox checked={c.selecionado} onChange={e=> handleChecked(c.id)} disabled={c.id === "" && true}/>
                    }
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor:c.tipo === "entrada" ? corVerde : c.id === "" ? corDizimo : corVermelho}}> 
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
                    <ListItemText>
                        <div>
                            <div>{c.nome}</div>
                            <div style={{color:c.tipo==="entrada"? corVerde : c.id === "" ? corDizimo: corVermelho , fontSize:12}}>{formatoMonetario(c.valor)}</div>
                        </div>
                    </ListItemText>
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
  )
}
