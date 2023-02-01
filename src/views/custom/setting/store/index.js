// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('users/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/users`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'users/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/users/add-event`, { data })
    // await dispatch(getData(getState().userss.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'users/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/users/update-event`, { data })
    // await dispatch(getData(getState().users.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('users/deleteEvent', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/users/delete-event`, { id })
  // await dispatch(getData(getState().settings.params))
  return id
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
    })
  }
})

export default usersSlice.reducer
