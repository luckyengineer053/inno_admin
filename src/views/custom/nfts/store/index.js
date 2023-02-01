// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('nft/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/nft`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'nft/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/nft/add-event`, { data })
    await dispatch(getData(getState().nft.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'nft/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/nft/update-event`, { data })
    await dispatch(getData(getState().nft.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('nft/deleteEvent', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/nft/delete-event`, { id })
  await dispatch(getData(getState().nft.params))
  return id
})

export const nftSlice = createSlice({
  name: 'nft',
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

export default nftSlice.reducer
