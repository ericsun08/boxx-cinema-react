import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSeatsByScreen = createAsyncThunk('getSeatsByScreen', async(value) => {
    const { ScreenId, ShowId } = value

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seats/seatView?ScreenId=${ScreenId}&ShowId=${ShowId}`)
        return response
    } catch(err){
        console.log(err)
    }
})

export const SeatDetail = createSlice({
    name:'SeatDetail',
    initialState: {
        seats:[],
        loading:false,
        error:null,
    },
    extraReducers: (builder) => {
        builder
          .addCase(getSeatsByScreen.pending, (state) => {
            state.loading = true;
          })
          .addCase(getSeatsByScreen.fulfilled, (state, action) => {
            state.loading = false;
            state.seats = action.payload;
          })
          .addCase(getSeatsByScreen.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export default SeatDetail.reducer