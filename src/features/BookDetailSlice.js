import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import authHeader from '../services/authHeader'

export const bookTicket = createAsyncThunk('bookTicket', async (body, { rejectWithValue }) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bookings`, body, { headers: authHeader() })
        return response
    }catch(err){
        return rejectWithValue(err.response)
    }
})

export const getBookingList = createAsyncThunk('getBookingList', async (UserId) => {
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/${UserId}`, { headers: authHeader() })
    return response
  }catch(err){
    console.log(err)
  }
})

export const getTicketList = createAsyncThunk('getTicketList', async (UserId) => {
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/tickets/${UserId}`, { headers: authHeader() })
    return response
  }catch(err){
    console.log(err)
  }
})

export const payTickets = createAsyncThunk('payTickets', async (value) => {
  const { BookingId, UserId } = value

  try{
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/bookings/pay?BookingId=${BookingId}&UserId=${UserId}`, null, { headers: authHeader() })
    return response
  }catch(err){
    console.log(err)
  }
})

export const abortBook = createAsyncThunk('abortBooking', async (value) => {
  const { BookingId, UserId } = value

  try{
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/bookings?BookingId=${BookingId}&UserId=${UserId}`, { headers: authHeader() })
    return response
  }catch(err){
    console.log(err)
  }
})

export const BookDetail = createSlice({
    name:'BookDetail',
    initialState:{
        bookings:[],
        bookingLists:[],
        bookedDetails:[],
        ticketList:[],
        selectedTicket:null,
        loading:false,
        error:null,
    },
    reducers:{
      handleSelectedBooking: (state, action) => {
        state.bookings = action.payload
      },
      handleSelectedTicket: (state, action) => {
        state.selectedTicket = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(bookTicket.pending, (state) => {
            state.loading = true;
          })
          .addCase(bookTicket.fulfilled, (state, action) => {
            state.bookings = action.payload.data.Booking
            state.loading = false;
          })
          .addCase(bookTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(abortBook.pending, (state) => {
            state.loading = true;
          })
          .addCase(abortBook.fulfilled, (state, action) => {
            state.bookings = []
            state.loading = false;
          })
          .addCase(abortBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getBookingList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getBookingList.fulfilled, (state, action) => {
            state.bookingLists = action.payload
            state.loading = false;
          })
          .addCase(getBookingList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(payTickets.pending, (state) => {
            state.loading = true;
          })
          .addCase(payTickets.fulfilled, (state, action) => {
            state.bookedDetails = action.payload
            state.loading = false;
          })
          .addCase(payTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getTicketList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getTicketList.fulfilled, (state, action) => {
            state.ticketList = action.payload
            state.loading = false;
          })
          .addCase(getTicketList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export const { handleSelectedBooking, handleSelectedTicket } = BookDetail.actions

export default BookDetail.reducer