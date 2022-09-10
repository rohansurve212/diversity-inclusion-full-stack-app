/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import userBackgroundService from './userBackgroundService'

const initialState = {
  userBackground: {},
  createUserBackgroundIsError: false,
  createUserBackgroundIsSuccess: false,
  createUserBackgroundIsLoading: false,
  createUserBackgroundMessage: '',
  getUserBackgroundIsError: false,
  getUserBackgroundIsSuccess: false,
  getUserBackgroundIsLoading: false,
  getUserBackgroundMessage: '',
  updateUserBackgroundIsError: false,
  updateUserBackgroundIsSuccess: false,
  updateUserBackgroundIsLoading: false,
  updateUserBackgroundMessage: '',
  deleteUserBackgroundIsError: false,
  deleteUserBackgroundIsSuccess: false,
  deleteUserBackgroundIsLoading: false,
  deleteUserBackgroundMessage: '',
}

//Create new userBackground
export const createUserBackground = createAsyncThunk(
  'userBackground/create',
  async (newUserBackgroundData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await userBackgroundService.createUserBackground(
        newUserBackgroundData,
        token
      )
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Get userBackground
export const getUserBackground = createAsyncThunk(
  'userBackground/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await userBackgroundService.getUserBackground(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Update userBackground
export const updateUserBackground = createAsyncThunk(
  'userBackground/update',
  async (updatedUserBackgroundData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await userBackgroundService.updateUserBackground(
        updatedUserBackgroundData,
        token
      )
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Delete userBackground
export const deleteUserBackground = createAsyncThunk(
  'userBackground/delete',
  async (userBackgroundId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await userBackgroundService.deleteUserBackground(
        userBackgroundId,
        token
      )
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userBackgroundSlice = createSlice({
  name: 'userBackground',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserBackground.pending, (state) => {
        state.createUserBackgroundIsLoading = true
      })
      .addCase(createUserBackground.fulfilled, (state, action) => {
        state.createUserBackgroundIsLoading = false
        state.createUserBackgroundIsSuccess = true
        state.userBackground = action.payload
      })
      .addCase(createUserBackground.rejected, (state, action) => {
        state.createUserBackgroundIsLoading = false
        state.createUserBackgroundIsError = true
        state.createUserBackgroundMessage = action.payload
      })
      .addCase(getUserBackground.pending, (state) => {
        state.getUserBackgroundIsLoading = true
      })
      .addCase(getUserBackground.fulfilled, (state, action) => {
        state.getUserBackgroundIsLoading = false
        state.getUserBackgroundIsSuccess = true
        state.userBackground = action.payload
      })
      .addCase(getUserBackground.rejected, (state, action) => {
        state.getUserBackgroundIsLoading = false
        state.getUserBackgroundIsError = true
        state.getUserBackgroundMessage = action.payload
      })
      .addCase(updateUserBackground.pending, (state) => {
        state.updateUserBackgroundIsLoading = true
      })
      .addCase(updateUserBackground.fulfilled, (state, action) => {
        state.updateUserBackgroundIsLoading = false
        state.updateUserBackgroundIsSuccess = true
        state.userBackground = action.payload
      })
      .addCase(updateUserBackground.rejected, (state, action) => {
        state.updateUserBackgroundIsLoading = false
        state.updateUserBackgroundIsError = true
        state.updateUserBackgroundMessage = action.payload
      })
      .addCase(deleteUserBackground.pending, (state) => {
        state.deleteUserBackgroundIsLoading = true
      })
      .addCase(deleteUserBackground.fulfilled, (state, action) => {
        state.deleteUserBackgroundIsLoading = false
        state.deleteUserBackgroundIsSuccess = true
        state.userBackground = {}
      })
      .addCase(deleteUserBackground.rejected, (state, action) => {
        state.deleteUserBackgroundIsLoading = false
        state.deleteUserBackgroundIsError = true
        state.deleteUserBackgroundMessage = action.payload
      })
  },
})

export const { reset } = userBackgroundSlice.actions
export default userBackgroundSlice.reducer
