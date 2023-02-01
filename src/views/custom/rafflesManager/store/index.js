// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'
import myToast from '../../../../utility/toast'

export const getData = createAsyncThunk('raffles/getData', async params => {
  try {
    const user = JSON.parse(localStorage.getItem('userData'))
    const discordName = user.discordName
    const response = await axios.post(`${BACKEND_URL}/api/raffles`, { params })
    return {
      allData: [],
      data: response.data.data.rows,
      totalPages: response.data.data.total,
      params
    }
  } catch (error) {
    console.log(error)
  }

})

export const addEvent = createAsyncThunk(
  'raffles/addEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/raffles/add-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Created a new raffle')
      await dispatch(getData(getState().raffles.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'raffles/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      await axios({
        method: "post",
        url: `${BACKEND_URL}/api/raffles/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Updated one raffle data')
      await dispatch(getData(getState().raffles.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }
  }
)

export const deleteEvent = createAsyncThunk('raffles/deleteEvent', async (id, { dispatch, getState }) => {
  try {
    await axios.post(`${BACKEND_URL}/api/raffles/delete-event`, { id })
    myToast.successToast('Deleted one raffle')
    await dispatch(getData(getState().raffles.params))
    return id
  } catch (error) {
    console.log(error)
    myToast.errorToast('Failed to delete')
  }
})

export const rafflesSlice = createSlice({
  name: 'raffles',
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

export default rafflesSlice.reducer

// export const getProjectNameByDiscordId = async (discordId) => {
//   if (discordId === undefined) {
//     return null
//   }
//   try {
//     const res = await axios.post(`${BACKEND_URL}/api/project/getDataByDiscordId`, {
//       discordId
//     })

//     if (res.data.success) {
//       return res.data.data
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }