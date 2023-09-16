import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment'

export const getAllScheduleByMovieCity = createAsyncThunk('getAllScheduleByMovieCity', async (value) => {
    const { CityId, MovieId, Date } = value

    const formattedDate = moment(Date).format('MM/DD/YYYY')

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/searchShow/getScheduleByCity?CityId=${CityId}&MovieId=${MovieId}&SelectedDate=${formattedDate}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getAllScheduleByTheaterCity = createAsyncThunk('getAllScheduleByTheaterCity', async (value) => {
    const { TheaterId, Date } = value

    const formattedDate = moment(Date).format('MM/DD/YYYY')

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/searchShow/getScheduleByThatre?TheatreId=${TheaterId}&SelectedDate=${formattedDate}`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const ShowDetail = createSlice({
    name:'ShowDetail',
    initialState: {
        schedules:[],
        schedules2: [],
        selectedDate: moment(new Date()).format('dddd, DD MMM YYYY'),
        selectedShow: null,
        subTotal:null,
        ticketQty:null,
        isPanelOpen: false,
        isShowDetail: false,
        isCityList: false,
        isTheaterList: false,
        isPayment:true,
        loading:false,
        error:null,
    },
    reducers:{
        changeDate: (state, action) => {
            state.selectedDate = action.payload
        },
        openPanel: (state) => {
            state.isPanelOpen = !state.isPanelOpen
        },
        displayList: (state, action) => {
            state.isShowDetail = action.payload.isShowDetail
            state.isCityList = action.payload.isCityList
            state.isTheaterList = action.payload.isTheaterList
            state.isPayment =  action.payload.isPayment
        },
        handleShowDetail: (state, action) => {
            state.selectedShow = action.payload
        },
        handleTicket: (state, action) => {
            state.ticketQty = action.payload.quantity
            state.subTotal = action.payload.subTotal
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllScheduleByMovieCity.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllScheduleByMovieCity.fulfilled, (state, action) => {
            state.loading = false;
            state.schedules = action.payload;
          })
          .addCase(getAllScheduleByMovieCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(getAllScheduleByTheaterCity.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllScheduleByTheaterCity.fulfilled, (state, action) => {
            state.loading = false;
            state.schedules2 = action.payload;
          })
          .addCase(getAllScheduleByTheaterCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export const { changeDate, openPanel, displayList, handleShowDetail, handleTicket } = ShowDetail.actions

export default ShowDetail.reducer