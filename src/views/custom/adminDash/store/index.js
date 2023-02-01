// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'
import { errorToast, successToast } from '../../../../utility/toast'

export const getData = createAsyncThunk('users/getData', async username => {
  const response = await axios.post(`${BACKEND_URL}/api/user/getAdminOverview`, { username })
  return {
    data: response.data.data
  }
})

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async (data, { dispatch, getState }) => {
    try {
      const result = await axios.post(`${BACKEND_URL}/api/user/updatePassword`, { data })
      if (result.data.success) {
        const userData = localStorage.getItem('userData')
        const username = JSON.parse(userData).username
        await dispatch(getData(username))
        successToast('Your password was changed')
      } else {
        errorToast('You failed to change your password')
      }
    } catch (error) {
      console.log(error)
      errorToast('You failed to change password becuase server error')
    }
  }
)

// export const addEvent = createAsyncThunk(
//   'users/addEvent',
//   async (data, { dispatch, getState }) => {
//     await axios.post(`${BACKEND_URL}/api/users/add-event`, { data })
//     // await dispatch(getData(getState().userss.params))
//     return data
//   }
// )

// export const updateEvent = createAsyncThunk(
//   'users/updateEvent',
//   async (data, { dispatch, getState }) => {
//     await axios.post(`${BACKEND_URL}/api/users/update-event`, { data })
//     // await dispatch(getData(getState().users.params))
//     return data
//   }
// )

// export const deleteEvent = createAsyncThunk('users/deleteEvent', async (id, { dispatch, getState }) => {
//   await axios.post(`${BACKEND_URL}/api/users/delete-event`, { id })
//   // await dispatch(getData(getState().settings.params))
//   return id
// })

export const adminOverview = createSlice({
  name: 'adminOverview',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default adminOverview.reducer
