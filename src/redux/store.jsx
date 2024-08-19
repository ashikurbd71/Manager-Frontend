import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './feature/auth'



export const store = configureStore({
  reducer: {

    user : authSlice

  },
})