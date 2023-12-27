import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Chip, IconButton, TextField } from '@mui/material';
import BtnLoading from '../../btnLoading';
import AddIcon from '@mui/icons-material/Add';
import { mesType2 } from '../../../types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { adicionarContasApi } from '../../Api/contasApi';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setAtualizarRedux } from '../../Redux/Reducers/atualizaRedux';
import { trocaVirgulaPorPonto } from '../../../metodosUteis';


export default function ModalAdicionarConta({handleAtualiza,mes}:{handleAtualiza?:any, mes?:mesType2}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState("")
  const [selecionado, setSelecionado] = useState(true)
  const [valor, setValor] = useState("0")
  const [age, setAge] = React.useState('');
  const [nomeErro, setnomeErro] = useState(false)
  const [valorErro, setvalorErro] = useState(false)
  const [tipoErro, settipoErro] = useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    if(parseInt(event.target.value) === 10){
      setTipo("entrada")
    } else {
      setTipo("saida")
    }
  };
  useEffect(()=>{

  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNome("")
    setValor("0")
    setOpen(false);
  };
  
  const disp = useAppDispatch()
  const atual = useAppSelector(state=>state.atualizaRedux.atual)

  const handleAdicionar = async()=>{
    if (nome.trim() === "") {
      setnomeErro(true)
      return null
    }else{
      setnomeErro(false)
    }

    if (parseFloat(valor) <= 0) {
      setvalorErro(true)
      return null
    } else {
      setvalorErro(false)
    }

    if (age === "") {
      settipoErro(true)
      return null
    } else {
      settipoErro(false)      
    }

    setLoading(true)
    await adicionarContasApi(nome, trocaVirgulaPorPonto(valor), mes?.id as string, tipo)
    disp(setAtualizarRedux(!atual))
    setLoading(false)
    handleClose()
  }
  console.log(age)
  return (
    <React.Fragment>
      {/* <IconButton  onClick={handleClickOpen}>
        <AddIcon/>
      </IconButton> */}
      <Chip label="Adicionar canta" onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adicionar conta"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField error={nomeErro ? true : false} type='text' fullWidth  placeholder='Nome' onChange={e=>setNome(e.target.value)}/>
            <TextField error={valorErro ? true : false} type='text' sx={{m:"20px 0px"}} fullWidth placeholder='Valor' onChange={e=>setValor(e.target.value)}/>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de conta</InputLabel>
                <Select
                  error={tipoErro ? true : false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
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
           <Button onClick={handleAdicionar} color='success' variant='contained'>Confirmar</Button>
          }
          <Button onClick={handleClose} color='error' variant='contained'>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
