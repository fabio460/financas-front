import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { mesType } from '../../types';
import { adicionarContas_a_PagarApi } from '../Api/contas_a_pagarApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAdicionarConta({mes, handleAtualiza}:{mes:mesType, handleAtualiza:any}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState(0)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdicionar = async()=>{
    const res = await adicionarContas_a_PagarApi(nome, valor, mes.id);
    alert(JSON.stringify(res))
    handleAtualiza()
    handleClose()
  }
  return (
    <React.Fragment>
      <Button color='error' fullWidth variant="outlined" onClick={handleClickOpen}>
        saidas
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Adicione as suas contas do mês de "+mes.mesReferente}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='inputGlobalContainer'>
              <input onChange={e=>setNome(e.target.value)} className='inputGlobal' placeholder='Nome'/>
            </div>
            <div className='inputGlobalContainer'>
              <input onChange={e=>setValor(parseFloat(e.target.value))} className='inputGlobal' placeholder='Valor'/>
            </div>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdicionar}>Confirmar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
