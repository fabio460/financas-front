import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function ModalDeletarUsuario({deletarUsuario}:{deletarUsuario:any}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Typography onClick={handleClickOpen} textAlign="center">Deletar conta</Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Coidado, você esta prestes a remover sua conta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Ao confirmar, você estará removendo sua conta e perderá todos os seus dados
             Esta ação não poderá ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletarUsuario} variant='contained' color='success'>confirmar</Button>
          <Button onClick={handleClose} autoFocus variant='contained' color='error'>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
