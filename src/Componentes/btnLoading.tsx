import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function BtnLoading() {
  return (
    <CircularProgress size={25} color='inherit' sx={{margin:"0px 25px"}}/>
  )
}
