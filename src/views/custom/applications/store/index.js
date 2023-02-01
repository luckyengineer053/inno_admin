// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('applications/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/applications`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'applications/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/applications/add-event`, { data })
    // await dispatch(getData(getState().applicationss.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'applications/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/applications/update-event`, { data })
    // await dispatch(getData(getState().applications.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('applications/deleteEvent', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/applications/delete-event`, { id })
  // await dispatch(getData(getState().settings.params))
  return id
})

export const applicationsSlice = createSlice({
  name: 'applications',
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

export default applicationsSlice.reducer
