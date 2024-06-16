import * as React from 'react';
import Button from '@mui/material/Button';
import {IconButton} from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModalDeletarEntradaSaida from './Modais/modalDeletarEntSaida';
import { corDosItens } from '../Cores';
import ModalAtualizarEntSaida from './Modais/modalAtualizarEntSaida';
import { contasType, entradasSaidasType } from '../../types';


export default function FadeMenu({id, tipo, handleAtualiza, elem, atual, disp, setAtualizarRedux}:{id:string, tipo:string, handleAtualiza:any, elem:contasType, disp?:any, setAtualizarRedux?:any, atual?:any}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:corDosItens}}
        disabled={id==="" && true}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <ModalDeletarEntradaSaida 
          CloseAll={handleClose}
          id={id} 
          tipo={tipo} 
          handleAtualiza={handleAtualiza}
          disp={disp} 
          setAtualizarRedux={setAtualizarRedux}
          atual={atual}    
          elem={elem}
        />
        <ModalAtualizarEntSaida 
          CloseAll={handleClose} 
          id={id} tipo={tipo} 
          handleAtualiza={handleAtualiza}
          elem={elem} close={handleClose}
          disp={disp} 
          setAtualizarRedux={setAtualizarRedux}
          atual={atual} 
        />
      </Menu>
    </div>
  );
}
