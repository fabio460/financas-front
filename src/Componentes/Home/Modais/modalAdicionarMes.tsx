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
import { adicionarMesApi, listarMesApi } from '../../Api/mesApi';
import { corLaranja } from '../../Cores';
import BtnLoading from '../../btnLoading';
import { Chip, TextField } from '@mui/material';

export default function ModalAdicionarMes({id}:{id:string}) {
  const [open, setOpen] = React.useState(false);
  const [Mes, setMes] = React.useState('');
  const [ano, setAno] = React.useState<number>(2024)
  const [loading, setLoading] = React.useState(false)

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
    if (ano === null || ano <= 2000) {
      alert("O campo ano deve ser especificado acima de 2000")
    }
    setLoading(true)
    const r = await adicionarMesApi(id, Mes, ano); 
    const m = await listarMesApi(id)
    localStorage.setItem("step",JSON.stringify(m.length-1))
    window.location.reload()
    handleClose()
  }
  

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
  return (
    <div>
      <React.Fragment>
          <div style={{background:"", position:"initial", bottom:20, left:"40%", right:"40%",display:"flex",justifyContent:"center"}}>
            
            {/* <Box sx={{ '& > :not(style)': { m: 0, background:"",zIndex:1 } }}>
                <Fab sx={{bgcolor:corLaranja}} color="primary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Box> */}
            <Chip label="Adicionar mes" onClick={handleClickOpen} color='secondary' variant='outlined'/>
          </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Adicione um mês</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  Adicione o mês das suas contas e depois adicione as entradas e as saidas financeiras, ou seja:
                  quanto entrou e quanto saiu no mês!
              </DialogContentText>
              <TextField 
                   fullWidth
                   defaultValue={ano}
                   onChange={e=> setAno(parseInt(e.target.value))}
                   label="Ano "
                   sx={{mt:2,mb:2}}
              />
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
            {
              loading ? <Button color='success' variant='contained' ><BtnLoading/></Button>:
              <Button onClick={adicionarMes} variant='contained' color={"success"}>Adicionar</Button>              
            }
            <Button onClick={handleClose} variant='contained' color='error'>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
