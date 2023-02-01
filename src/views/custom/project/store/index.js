// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
// custom
import myToast from '../../../../utility/toast'

import { BACKEND_URL } from '@src/configs'

export const getData = createAsyncThunk('project/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/project`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const getOneData = createAsyncThunk('project/getOneData', async id => {
  const response = await axios.get(`${BACKEND_URL}/api/project/getOneData?id=${id}`)
  return {
    oneData: response.data.data
  }
})

export const addEvent = createAsyncThunk(
  'project/addEvent',
  async (formData, { dispatch, getState }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/project/add-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (res.data.success) {
        myToast.successToast('Created one project')
        await dispatch(getData(getState().project.params))
      } else {
        myToast.errorToast(res.data.message)
      }
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }

    return formData
  }
)

export const updateEvent = createAsyncThunk(
  'project/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/project/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (res.data.success) {
        myToast.successToast('Updated one project data')
        await dispatch(getData(getState().project.params))
        await dispatch(getOneData(getState().project.oneData))
        return formData
      }
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }
  }
)

export const deleteEvent = createAsyncThunk('project/deleteEvent', async (id, { dispatch, getState }) => {
  try {
    await axios.post(`${BACKEND_URL}/api/project/delete-event`, { id })
    myToast.successToast('Deleted one project')
    await dispatch(getData(getState().project.params))
    return id
  } catch (error) {
    console.log(error)
    myToast.errorToast('Failed to delete')
  }

})

export const updateEventDetail = createAsyncThunk(
  'project/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/project/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (res.data.success) {
        myToast.successToast('Updated one project data')
        // const temp = JSON.parse(formData)
        // await dispatch(getOneData(getState().project.oneData._id))
        return formData
      }
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }
  }
)

export const projectlice = createSlice({
  name: 'project',
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

export default projectlice.reducer
