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
import { adicionarGanhos } from '../Api/ganhosApi';
import { corDark, corDosItens, corVerde } from '../Cores';
import { IconButton, TextField } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BtnLoading from '../btnLoading';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAdicionarEntradas({mes, handleAtualiza}:{mes:mesType, handleAtualiza:any}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("")
  const [valor, setValor] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdicionar = async()=>{
    setLoading(true)
    const res = await adicionarGanhos(nome, valor, mes.id);
    handleAtualiza()
    setLoading(false)
    handleClose()
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <ArrowCircleUpIcon sx={{width:"35px", height:"35px", color:corVerde}} />
      </IconButton>
      <Dialog
        component={"div"} 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{color:corVerde}}>Entradas mês de {mes.mesReferente}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField type='text' fullWidth placeholder='Nome' onChange={e=>setNome(e.target.value)}/>
            <TextField type='text' sx={{mt:3}} fullWidth placeholder='Valor' onChange={e=>setValor(parseFloat(e.target.value))}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading ? <Button color='success' variant='contained' ><BtnLoading/></Button>:
            <Button onClick={handleAdicionar} color='success' variant='contained'>Confirmar</Button>
          }
          <Button onClick={handleClose} color='error' variant='contained'>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
