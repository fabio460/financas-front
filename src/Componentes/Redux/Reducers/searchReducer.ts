import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
   search:""
}

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
     setSearch: (state, action)=>{
         state.search = action.payload
     }
  }
});

export const {setSearch} = searchReducer.actions

export default searchReducer.reducer