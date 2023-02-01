// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'
import myToast from '../../../../utility/toast'

export const getData = createAsyncThunk('daoVoting/getData', async params => {
  const user = JSON.parse(localStorage.getItem('userData'))
  const discordName = user.discordName
  const response = await axios.post(`${BACKEND_URL}/api/daoVoting/getDataByDiscordName`, { params, discordName })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'daoVoting/addEvent',
  async (data, { dispatch, getState }) => {
    try {
      await axios.post(`${BACKEND_URL}/api/daoVoting/add-event`, { data })
      myToast.successToast('Created one voting')
      await dispatch(getData(getState().daoVotings.params))
      return data
    } catch (error) {
      console.log(error)
      myToast.errorToast('Failed to create')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'daoVoting/updateEvent',
  async (data, { dispatch, getState }) => {
    try {
      await axios.post(`${BACKEND_URL}/api/daoVoting/update-event`, { data })
      myToast.successToast('Updated one voting data')
      await dispatch(getData(getState().daoVotings.params))
      return data
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

export const daoVotingSlice = createSlice({
  name: 'daoVotings',
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

export default daoVotingSlice.reducer
