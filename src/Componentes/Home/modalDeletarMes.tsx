import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deletarMesApi, listarMesApi } from '../Api/mesApi';

export default function ModalDeletarMes({idMes}:{idMes:string}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletarMes = async()=>{
    const res = await deletarMesApi(idMes)
    //alert(res)
    const list = await listarMesApi()
    localStorage.setItem("step",JSON.stringify(list.length-1))
    window.location.reload()
    handleClose()
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}><DeleteIcon/></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja remover este mês?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao deletar o mes voçê estará deletando todos os dados deste mes.
            Esta ação não poderá ser revertida!

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletarMes} variant='contained' color='error'>Confirmar</Button>
          <Button onClick={handleClose} autoFocus color='error' variant='contained'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
