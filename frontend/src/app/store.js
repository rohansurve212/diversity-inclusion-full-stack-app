/** @format */

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userBackgroundReducer from '../features/userBackground/userBackgroundSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userBackground: userBackgroundReducer,
  },
})
