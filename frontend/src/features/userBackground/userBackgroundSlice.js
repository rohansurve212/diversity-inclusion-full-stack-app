/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import userBackgroundService from './userBackgroundService'

const initialState = {
  userBackground: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
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
        state.isLoading = true
      })
      .addCase(createUserBackground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userBackground = action.payload
      })
      .addCase(createUserBackground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserBackground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserBackground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userBackground = action.payload
      })
      .addCase(getUserBackground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUserBackground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserBackground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userBackground = action.payload
      })
      .addCase(updateUserBackground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUserBackground.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserBackground.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userBackground = {}
      })
      .addCase(deleteUserBackground.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userBackgroundSlice.actions
export default userBackgroundSlice.reducer
