import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type initialStateType = {
    usuario:{
        id:string
        email:string
        nome:string
    }|{}
}
const initialState:any = {
    usuario:{}
}

const usuarioRedux = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    usuarioAutenticado : (state, action:PayloadAction)=>{
        state.usuario = action.payload
    }
  }
});

export const {usuarioAutenticado} = usuarioRedux.actions

export default usuarioRedux.reducer