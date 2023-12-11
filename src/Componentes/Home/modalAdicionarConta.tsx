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
import { IconButton, TextField } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { corVermelho } from '../Cores';
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
    handleAtualiza()
    handleClose()
  }
  return (
    <React.Fragment>
      {/* <Button color='error' variant="outlined" onClick={handleClickOpen}>
        saidas
      </Button> */}
      <IconButton onClick={handleClickOpen}>
        <ArrowCircleDownIcon sx={{width:"35px", height:"35px", color:corVermelho}}/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{color:corVermelho}}>Saidas mês de {mes.mesReferente}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* <div className='inputGlobalContainer'>
              <input onChange={e=>setNome(e.target.value)} className='inputGlobal' placeholder='Nome'/>
            </div>
            <div className='inputGlobalContainer'>
              <input onChange={e=>setValor(parseFloat(e.target.value))} className='inputGlobal' placeholder='Valor'/>
            </div> */}
            <TextField type='text' fullWidth placeholder='Nome' onChange={e=>setNome(e.target.value)}/>
            <TextField type='text' sx={{mt:3}} fullWidth placeholder='Valor' onChange={e=>setValor(parseFloat(e.target.value))}/>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdicionar} color='success' variant='contained'>Confirmar</Button>
          <Button onClick={handleClose} color='error' variant='contained'>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
