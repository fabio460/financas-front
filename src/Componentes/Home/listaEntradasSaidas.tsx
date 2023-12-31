
import Divider from '@mui/material/Divider';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WifiIcon from '@mui/icons-material/Wifi';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { checkedListType, contasType, entradasSaidasType } from '../../types';
import { formatoMonetario } from '../../metodosUteis';
import FadeMenu from './menu';
import { ignoreMaiusMinusAcent } from "../../metodosUteis";
import { corDosItens, corVerde, corVermelho } from '../Cores';
import { CheckBox } from '@mui/icons-material';
import { Checkbox } from '@mui/material';

export default function ListaEntradasSaidas({list, tipo, handleAtualiza}:{list:contasType[], tipo:string, handleAtualiza:any}) {
    return (
        <div>
            <List sx={{ width: '100%'}}>
                {
                    list.map((e, key)=>{
                        return(
                            <div>
                                <ListItem sx={{p:0, display:""}} key={key}>
                                    <div style={{color:tipo==="entrada"? corVerde : corVermelho ,display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor:corDosItens}}>
                                                {
                                                ignoreMaiusMinusAcent(e.nome).includes(("cartao")) || ignoreMaiusMinusAcent(e.nome).includes(("fatura")) ? <CreditCardIcon  />:
                                                ignoreMaiusMinusAcent(e.nome).includes("aluguel") ? <MapsHomeWorkIcon />:
                                                ignoreMaiusMinusAcent(e.nome).includes("internet") ? <WifiIcon />:
                                                ignoreMaiusMinusAcent(e.nome).includes("salario") ? <CurrencyExchangeIcon/> :
                                                ignoreMaiusMinusAcent(e.nome).includes("gas") ? <PropaneTankIcon />:
                                                ignoreMaiusMinusAcent(e.nome).includes("luz") ? <EmojiObjectsIcon />:
                                                ignoreMaiusMinusAcent(e.nome).includes("tv") || ignoreMaiusMinusAcent(e.nome).includes("genesio")?<LiveTvIcon />:
                                                ignoreMaiusMinusAcent(e.nome).includes("dizimo") ? <RequestQuoteIcon />:
                                                <WorkIcon/>
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={e.nome} secondary={formatoMonetario(e.valor)} />
                                    </div>
                                    <FadeMenu id={e.id} tipo={tipo} handleAtualiza={handleAtualiza} elem={e}/>
                                </ListItem>
                                <Divider sx={{bgcolor:corDosItens, height:"1px", margin:"0px 5px",}}/>
                            </div>
                            )
                    })
                }  
            </List>
        </div>
    );
}
