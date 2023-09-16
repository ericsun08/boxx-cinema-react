import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllTheaterList = createAsyncThunk('getAllTheaterList', async (value) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theatres/findTheatreByCity?CityId=${value}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const TheaterDetail = createSlice({
    name:'TheaterDetail',
    initialState: {
        theaters:[],
        selectedTheater: null,
        loading:false,
        error:null,
    },
    reducers: {
        changeTheater: (state, action) => {
            state.selectedTheater = action.payload.Theater
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllTheaterList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllTheaterList.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = action.payload;
            if (action.payload && action.payload.length > 0) {
                state.selectedTheater = action.payload[0];
            }
          })
          .addCase(getAllTheaterList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export const { changeTheater } = TheaterDetail.actions

export default TheaterDetail.reducer