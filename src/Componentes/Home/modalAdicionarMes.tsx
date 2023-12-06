import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { adicionarMesApi } from '../Api/mesApi';

export default function ModalAdicionarMes({id}:{id:string}) {
  const [open, setOpen] = React.useState(false);
  const [Mes, setMes] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMes(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adicionarMes = async()=>{
     const r = await adicionarMesApi(id, Mes);
     alert(JSON.stringify(r))
     handleClose()
  }

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto"]
  return (
    <React.Fragment>
        <Box sx={{ '& > :not(style)': { m: 1, position:"absolute", bottom:"2%", right:"2%" } }}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Mes}
                    label=""
                    onChange={handleChange}
                >
                    {
                        meses.map((elem, key)=>{
                           return <MenuItem value={elem}>{elem}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={adicionarMes}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
