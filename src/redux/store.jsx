import { configureStore } from '@reduxjs/toolkit'
import authSlice  from '../redux/feature/Auth'



export const store = configureStore({
  reducer: {

    user : authSlice

  },
})