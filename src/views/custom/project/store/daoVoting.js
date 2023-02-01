// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import myToast from '../../../../utility/toast'

import { BACKEND_URL } from '@src/configs'

export const getData = createAsyncThunk('daoVoting/getData', async (params) => {
  const response = await axios.post(`${BACKEND_URL}/api/daoVoting`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})


export const getOneData = createAsyncThunk('daoVoting/getOneData', async id => {
  const response = await axios.get(`${BACKEND_URL}/api/daoVoting/getOneData?id=${id}`)
  return {
    oneData: response.data.data
  }
})

export const addEvent = createAsyncThunk(
  'daoVoting/addEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/daoVoting/add-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Created one voting')
      await dispatch(getData(getState().daoVotings.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }

  }
)

export const updateEvent = createAsyncThunk(
  'daoVoting/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/daoVoting/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Updated one voting')
      await dispatch(getData(getState().daoVotings.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }
  }
)

export const deleteEvent = createAsyncThunk('daoVoting/deleteEvent', async (id, { dispatch, getState }) => {
  try {
    await axios.post(`${BACKEND_URL}/api/daoVoting/delete-event`, { id })
    myToast.successToast('Deleted one voting')
    await dispatch(getData(getState().daoVotings.params))
    return id
  } catch (error) {
    console.log(error)
    myToast.errorToast('Failed to delete')
  }
})


export const daoVotinglice = createSlice({
  name: 'daoVotings',
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

export default daoVotinglice.reducer
