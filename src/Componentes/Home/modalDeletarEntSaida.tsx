import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import { deletarContas_a_PagarApi } from '../Api/contas_a_pagarApi';
import { deletarGanhos } from '../Api/ganhosApi';
import { IconButton } from "@mui/material";
import BtnLoading from '../btnLoading';
export default function ModalDeletarEntradaSaida({id, tipo, CloseAll, handleAtualiza}:{id:string,CloseAll:any, tipo:string, handleAtualiza:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletar = async()=>{
    setLoading(true)
    if (tipo === "saida") {      
      const res = await deletarContas_a_PagarApi(id)
      handleAtualiza()
    }else{
      const res = await deletarGanhos(id)
      handleAtualiza()
    }
    handleClose()
    setLoading(false)
    CloseAll()
  }
  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>
        Deletar
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente deletar este item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação não poderá ser revertida.
            Clique em "CONFIRMAR DELEÇÃO" se estiver certo disso
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          {
            loading ? <Button color='success' variant='contained' ><BtnLoading/></Button>:
            <Button onClick={deletar} color='success' variant='contained'>confirmar</Button>
          }
          <Button onClick={handleClose} autoFocus color='error' variant='contained'>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
