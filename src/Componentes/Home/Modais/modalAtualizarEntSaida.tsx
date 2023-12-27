import React,{ useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { entradasSaidasType } from '../../../types';
import { atualizarContas_a_PagarApi } from '../../Api/contas_a_pagarApi';
import { atualizarGanhos } from '../../Api/ganhosApi';
import BtnLoading from '../../btnLoading';
import { atualizarContasApi } from '../../Api/contasApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAtualizarEntSaida({id, tipo, handleAtualiza, CloseAll,elem, close, atual, disp, setAtualizarRedux}:{id:string, CloseAll:any, tipo:string, handleAtualiza:any, close:any,elem:entradasSaidasType, disp?:any, setAtualizarRedux?:any, atual?:any}) {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState(elem.nome)
  const [valor, setValor] = useState(elem.valor)
  const [age, setAge] = React.useState(tipo === "entrada" ? "10":"20");
  const [Tipo, setTipo] = useState(tipo)
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(()=>{
    setNome(elem.nome)
    setValor(elem.valor)
  },[])
  const handleClose = () => {
    setOpen(false);
    close()
    CloseAll()
  };  

  const atualizar = async ()=>{
    setLoading(true)
    await atualizarContasApi(elem.id, nome, Tipo,valor, elem.idMes)
    disp(setAtualizarRedux(!atual))
    handleAtualiza()
    handleClose()
    setLoading(false)
  }


  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    if(parseInt(event.target.value) === 10){
      setTipo("entrada")
    } else {
      setTipo("saida")
    }
  };

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
            <TextField defaultValue={nome.toString()} type='text' fullWidth placeholder='Nome' onChange={e=>setNome(e.target.value)}/>
            <TextField defaultValue={valor.toString()} type='text' sx={{m:"20px 0px"}} fullWidth placeholder='Valor' onChange={e=>setValor(parseFloat(e.target.value))}/>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de conta</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  defaultValue={"10"}
                  label="Tipo de conta"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Entrada</MenuItem>
                  <MenuItem value={20}>Saída</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading ? <Button color='success' variant='contained' ><BtnLoading/></Button>:
            <Button onClick={atualizar} color='success' variant='contained'>confirmar</Button>
          }
          <Button onClick={handleClose} color='error' variant='contained'>cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
