import React,{useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
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
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Contas() {
  const [mes, setMes] = useState<mesType[]>([])
  const [atualiza, setatualiza] = useState(false)
  useEffect(()=>{
    async function getMes() {
      const res:any = await listarMesApi()
      setMes(res.reverse())
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
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 40,
          pl: 2,
          bgcolor: 'background.default',
          textAlign:"center",
          justifyContent:"center"
        }}
      >
        <Typography  >
          <div>Sobra {formatoMonetario(getSobra(mes[activeStep]?.ganhos, mes[activeStep]?.contas_A_Pagar))}</div>
          {mes[activeStep]?.mesReferente}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {mes.map((elem, index) => (
          <div  key={elem.mesReferente}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                {/* <div>Entradas</div>
                <div className='entradas'>{elem.ganhos.map((g, keyG)=>{
                  return <div>{g.nome} - {formatoMonetario(g.valor)}</div>
                })}</div>
                <div>Saidas</div>
                <div>{elem.contas_A_Pagar.map((g, keyG)=>{
                  return <div className='saidas'>{g.nome} - {formatoMonetario(g.valor)}</div>
                })}</div> */}
                <ListaEntradasSaidas list={elem.ganhos} tipo={"entrada"} handleAtualiza={handleAtualiza}/>
                <ListaEntradasSaidas list={elem.contas_A_Pagar} tipo={"saida"} handleAtualiza={handleAtualiza}/>
                
                
              </CardContent>
              <CardActions>
                <ModalAdicionarEntradas mes={elem} handleAtualiza={handleAtualiza}/>
                <ModalAdicionarConta mes={elem}  handleAtualiza={handleAtualiza}/>
              </CardActions>
            </Card>
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próximo
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </Box>
  );
}

export default Contas;
