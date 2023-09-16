import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import authHeader from '../services/authHeader'

export const saveMovie = createAsyncThunk('saveMovie', async(body) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/savedMovies`, body, { headers: authHeader() })
        return response
    } catch(err){
        console.log(err)
    }
})

export const getSavedMovie = createAsyncThunk('getSavedMovie', async(UserId) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/savedMovies/${UserId}`, { headers: authHeader() })
        return response
    } catch(err){
        console.log(err)
    }
})

export const deleteSavedMovie = createAsyncThunk('deleteSavedMovie', async(value) => {
    const { MovieId, UserId } = value

    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/savedMovies?MovieId=${MovieId}&UserId=${UserId}`, { headers: authHeader() })
        return response
    } catch(err){
        console.log(err)
    }
})

export const SaveMovieDetail = createSlice({
    name:'SaveMovieDetail',
    initialState: {
        savedMovies:[],
        loading:false,
        error:null,
    },
    extraReducers: (builder) => {
        builder
          .addCase(saveMovie.pending, (state) => {
            state.loading = true;
          })
          .addCase(saveMovie.fulfilled, (state, action) => {
            state.savedMovies = action.payload
            state.loading = false;
          })
          .addCase(saveMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getSavedMovie.pending, (state) => {
            state.loading = true;
          })
          .addCase(getSavedMovie.fulfilled, (state, action) => {
            state.savedMovies = action.payload
            state.loading = false;
          })
          .addCase(getSavedMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteSavedMovie.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteSavedMovie.fulfilled, (state, action) => {
            state.savedMovies = action.payload
            state.loading = false;
          })
          .addCase(deleteSavedMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export default SaveMovieDetail.reducer