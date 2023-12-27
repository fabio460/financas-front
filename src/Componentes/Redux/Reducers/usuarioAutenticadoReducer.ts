import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { usuarioLogadoType } from '../../../types';

export type initialStateType = {
    usuario:usuarioLogadoType | {}
}
const initialState:any = {
    usuario:{}
}

const usuarioRedux = createSlice({
  name: "usuarioAutenticado",
  initialState,
  reducers: {
    setUsuario : (state, action:PayloadAction)=>{
        state.usuario = action.payload
    }
  }
});

export const {setUsuario} = usuarioRedux.actions

export default usuarioRedux.reducer