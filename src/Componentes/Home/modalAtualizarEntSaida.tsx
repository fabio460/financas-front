import React,{ useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { MenuItem } from '@mui/material';
import { entradasSaidasType } from '../../types';
import { atualizarContas_a_PagarApi } from '../Api/contas_a_pagarApi';
import { atualizarGanhos } from '../Api/ganhosApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAtualizarEntSaida({id, tipo, handleAtualiza, elem, close}:{id:string, tipo:string, handleAtualiza:any, close:any,elem:entradasSaidasType}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState(elem.valor)
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(()=>{
    setNome(elem.nome)
    setValor(elem.valor)
  },[])
  const handleClose = () => {
    setOpen(false);
  };

  const atualizar = async ()=>{
    if (tipo === "saida") { 
        await atualizarContas_a_PagarApi(elem.id, nome, valor, elem.idMes)
        handleAtualiza()
        handleClose()
    }else{
        await atualizarGanhos(elem.id, nome, valor, elem.idMes)
        handleAtualiza()
        handleClose()
    }
    close()
  }
  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>Atualizar</MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Area de atualização de dados"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='inputGlobalContainer'>
                <input onChange={e=>setNome(e.target.value)} defaultValue={nome} className='inputGlobal' placeholder='Nome'/>
            </div>
            <div className='inputGlobalContainer'>
                <input onChange={e=>setValor(parseFloat(e.target.value))} defaultValue={valor.toString()} className='inputGlobal' placeholder='Valor'/>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizar} color='success' variant='contained'>confirmar</Button>
          <Button onClick={handleClose} color='error' variant='contained'>cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
