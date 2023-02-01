// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('country/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/country`, { params })
  return {
    data: response.data.data,
    params
  }
})

export const addEvent = createAsyncThunk(
  'country/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/country/add-event`, { data })
    await dispatch(getData(getState().country.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'country/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/country/update-event`, { data })
    await dispatch(getData(getState().country.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('country/deleteEvent', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/country/delete-event`, { id })
  await dispatch(getData(getState().country.params))
  return id
})

export const countrySlice = createSlice({
  name: 'country',
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

export default countrySlice.reducer
