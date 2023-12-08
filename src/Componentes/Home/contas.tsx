import React,{useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { listarMesApi } from '../Api/mesApi';
import ModalAdicionarConta from './modalAdicionarConta';
import { mesType } from '../../types';
import ModalAdicionarEntradas from './modalAdicionarEntradas';
import "./home.css"
import { formatoMonetario, getSobra } from '../../metodosUteis';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListaEntradasSaidas from './listaEntradasSaidas';
import Carousel from './Carousel';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Contas() {
  const [mes, setMes] = useState<mesType[]>([])
  const [atualiza, setatualiza] = useState(false)
  useEffect(()=>{
    async function getMes() {
      const res:any = await listarMesApi()
      setMes(res)
    }
    getMes()
  },[atualiza])
  const handleAtualiza = ()=>{
    setatualiza(!atualiza)
  }
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(localStorage.getItem("step") ? parseInt(localStorage.getItem("step") as string):0);
  const maxSteps = mes.length;
  localStorage.setItem("step",activeStep.toString())

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //localStorage.setItem("step",JSON.stringify((prevActiveStep) => prevActiveStep + 1))
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
   // setActiveStep(step);
   
  };



  return (
    <div>
      <Carousel mes={mes} handleAtualiza={handleAtualiza}/>
    </div>
  );
}

export default Contas;
