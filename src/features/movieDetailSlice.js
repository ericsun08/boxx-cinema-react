import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllMovieList = createAsyncThunk('getAllMovieList', async (value) => {
    const SearchValue = value || ""

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/searchMovieTitle?movieTitle=${SearchValue}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getMovieById = createAsyncThunk('getMovieById', async (MovieId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movies/getMovieById/${MovieId}`)
    return response.data
} catch (err) {
    console.log(err)
}
})

export const getAllMovieCast = createAsyncThunk('getAllMovieCast', async (value) => {
    const MovieId = value

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/movieCasts/${MovieId}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const MovieDetail = createSlice({
    name:'MovieDetail',
    initialState: {
        movies:[],
        casts:[],
        movie:[],
        loading:false,
        error:null,
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllMovieList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllMovieList.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
          })
          .addCase(getAllMovieList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getMovieById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getMovieById.fulfilled, (state, action) => {
            state.loading = false;
            state.movie = action.payload;
          })
          .addCase(getMovieById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getAllMovieCast.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllMovieCast.fulfilled, (state, action) => {
            state.loading = false;
            state.casts = action.payload;
          })
          .addCase(getAllMovieCast.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export default MovieDetail.reducer