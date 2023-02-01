// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'
import myToast from '../../../../utility/toast'

export const getData = createAsyncThunk('whitelistOpp/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/wlRaffle`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const getOneData = createAsyncThunk('whitelistOpp/getOneData', async id => {
  const response = await axios.get(`${BACKEND_URL}/api/wlRaffle/getOneData?id=${id}`)
  return {
    oneData: response.data.data
  }
})

export const addEvent = createAsyncThunk(
  'whitelistOpp/addEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/wlRaffle/add-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Created one opportunity')
      await dispatch(getData(getState().whitelistOpp.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'whitelistOpp/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/wlRaffle/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Updated one opportunity data')
      await dispatch(getData(getState().whitelistOpp.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }
  }
)

export const deleteEvent = createAsyncThunk('whitelistOpp/deleteEvent', async (id, { dispatch, getState }) => {
  try {
    await axios.post(`${BACKEND_URL}/api/wlRaffle/delete-event`, { id })
    myToast.successToast('Deleted one opportunity')
    await dispatch(getData(getState().whitelistOpp.params))
    return id
  } catch (error) {
    console.log(error)
    myToast.errorToast('Failed to delete')
  }
})

export const whitelistOpplice = createSlice({
  name: 'whitelistOpp',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    oneData: {
      name: ''
    }
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
      .addCase(getOneData.fulfilled, (state, action) => {
        state.oneData = action.payload
      })
  }
})

export default whitelistOpplice.reducer
