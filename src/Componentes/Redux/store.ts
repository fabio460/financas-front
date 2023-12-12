import { configureStore } from '@reduxjs/toolkit'
import usuarioRedux from './Reducers/usuarioRedux'
import searchReducer from './Reducers/searchReducer'
export const store = configureStore({
  reducer: {
    searchReducer,
    usuarioRedux,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch