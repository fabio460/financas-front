import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
   atual:false
}

const atualizaRedux = createSlice({
  name: "atualizaRedux",
  initialState,
  reducers: {
    setAtualizarRedux:(state,action)=>{
       state.atual = action.payload
    }
  }
});

export const {setAtualizarRedux} = atualizaRedux.actions

export default atualizaRedux.reducer