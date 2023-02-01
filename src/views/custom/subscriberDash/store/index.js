// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

import { errorToast, successToast } from '../../../../utility/toast'

export const getData = createAsyncThunk('users/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/user/getOverview`, { username: params })
  return {
    data: response.data.data
  }
})

// export const addEvent = createAsyncThunk(
//   'users/addEvent',
//   async (data, { dispatch, getState }) => {
//     await axios.post(`${BACKEND_URL}/api/users/add-event`, { data })
//     // await dispatch(getData(getState().userss.params))
//     return data
//   }
// )

export const updateEvent = createAsyncThunk(
  'users/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/users/update-event`, { data })
    // await dispatch(getData(getState().users.params))
    return data
  }
)

export const updateImage = createAsyncThunk(
  'users/updateImage',
  async (formData, { dispatch, getState }) => {
    try {
      const result = await axios({
        method: "post",
        url: `${BACKEND_URL}/api/user/updateImage`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      if (result.data.success) {
        const userData = localStorage.getItem('userData')
        const username = JSON.parse(userData).username
        await dispatch(getData(username))
        successToast('Your image was changed')
      } else {
        errorToast('You failed to change image')
      }
    } catch (error) {
      console.log(error)
      errorToast('You failed to change image becuase server error')
    }

  }
)

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

// export const deleteEvent = createAsyncThunk('users/deleteEvent', async (id, { dispatch, getState }) => {
//   await axios.post(`${BACKEND_URL}/api/users/delete-event`, { id })
//   // await dispatch(getData(getState().settings.params))
//   return id
// })

export const subscriberOverview = createSlice({
  name: 'subscriberOverview',
  initialState: {
    data: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default subscriberOverview.reducer
