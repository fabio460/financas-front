import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function BtnLoading({tam, marginH, marginV}:{tam?:number,marginV?:string, marginH?:string}) {
  return (
    <CircularProgress size={tam?tam:25} color='inherit' sx={{margin:`${marginH?marginH:'0'}px ${marginV?marginV:'25'}px`}}/>
  )
}
