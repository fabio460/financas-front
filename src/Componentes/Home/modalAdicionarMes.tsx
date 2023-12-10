import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { adicionarMesApi, listarMesApi } from '../Api/mesApi';
import { corLaranja } from '../Cores';

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
    if (Mes === "") {
      alert("adicione um mes!")
      return null
    }
    const r = await adicionarMesApi(id, Mes); 
    const m = await listarMesApi(id)
    localStorage.setItem("step",JSON.stringify(m.length-1))
    window.location.reload()
    handleClose()
  }
  

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  return (
    <div>
      <React.Fragment>
          <Box sx={{ '& > :not(style)': { m: 0, position:"fixed", bottom:"15px", right:"15px" } }}>
              <Fab sx={{bgcolor:corLaranja}} color="primary" aria-label="add" onClick={handleClickOpen}>
                  <AddIcon />
              </Fab>
          </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Adicione um mês</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Adicione o mês das suas contas e depois adicione as entradas e as saidas financeiras, ou seja:
                  quanto entrou e quanto saiu no mês!
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
                            return <MenuItem key={key} value={elem}>{elem}</MenuItem>
                          })
                      }
                  </Select>
              </FormControl>
        
          </DialogContent>
          <DialogActions>
            <Button onClick={adicionarMes} variant='contained' color={"success"}>Adicionar</Button>
            <Button onClick={handleClose} variant='contained' color='error'>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
