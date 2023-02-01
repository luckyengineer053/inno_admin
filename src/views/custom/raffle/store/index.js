// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('order/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/order`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const getCountry = createAsyncThunk('country/getData', async () => {
  const response = await axios.post(`${BACKEND_URL}/api/country`)
  return {
    country: response.data.data
  }
})

export const addEvent = createAsyncThunk(
  'order/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/order/add-event`, { data })
    await dispatch(getData(getState().orders.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'order/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/order/update-event`, { data })
    await dispatch(getData(getState().orders.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('order/deleteEvent', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/order/delete-event`, { id })
  await dispatch(getData(getState().orders.params))
  return id
})

export const completeOrder = createAsyncThunk('order/complete', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/order/complete-event`, { id })
  await dispatch(getData(getState().orders.params))
  return id
})

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    country: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.allData = action.payload.allData
        state.total = action.payload.totalPages
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.country = action.payload.country
      })
  }
})

export default orderSlice.reducer
