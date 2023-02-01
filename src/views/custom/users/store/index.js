// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'
import myToast from '../../../../utility/toast'

export const getData = createAsyncThunk('user/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/user`, { params })
  return {
    allData: [],
    data: response.data.data.data.rows,
    total: response.data.data.data.total,
    params
  }
})

// export const getCountry = createAsyncThunk('country/getData', async () => {
//   const response = await axios.post(`${BACKEND_URL}/api/country`)
//   return {
//     country: response.data.data
//   }
// })

export const addEvent = createAsyncThunk(
  'user/addEvent',
  async (formData, { dispatch, getState }) => {
    try {
      // await axios.post(`${BACKEND_URL}/api/user/add-event`, { data: formData })
      await axios({
        method: 'post',
        url: `${BACKEND_URL}/api/user/add-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Created one user')
      await dispatch(getData(getState().user.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'user/updateEvent',
  async (formData, { dispatch, getState }) => {
    try {
      // await axios.post(`${BACKEND_URL}/api/user/update-event`, { data: formData })
      await axios({
        method: 'post',
        url: `${BACKEND_URL}/api/user/update-event`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      myToast.successToast('Updated one user formData')
      await dispatch(getData(getState().user.params))
      return formData
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to update')
    }

  }
)

export const deleteEvent = createAsyncThunk('user/deleteEvent', async (id, { dispatch, getState }) => {
  try {
    await axios.post(`${BACKEND_URL}/api/user/delete-event`, { id })
    myToast.successToast('Deleted one user')
    await dispatch(getData(getState().user.params))
    return id
  } catch (error) {
    console.log(error)
    myToast.successToast('Failed to delete')
  }
})

export const completeuser = createAsyncThunk('user/complete', async (id, { dispatch, getState }) => {
  await axios.post(`${BACKEND_URL}/api/user/complete-event`, { id })
  await dispatch(getData(getState().user.params))
  return id
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    // country: [],
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
        state.total = action.payload.total
      })
  }
})

export default userSlice.reducer
