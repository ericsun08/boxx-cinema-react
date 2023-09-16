import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllCityList = createAsyncThunk('getAllCityList', async () => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cities/findAllCity`)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const CityDetail = createSlice({
    name:'CityDetail',
    initialState: {
        cities:[],
        selectedCityName:'',
        selectedCityId:'',
        loading:false,
        error:null,
    },
    reducers: {
        changeCity: (state, action) => {
            state.selectedCityName = action.payload?.CityName
            state.selectedCityId = action.payload?.CityId
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getAllCityList.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllCityList.fulfilled, (state, action) => {
            state.loading = false;
            state.cities = action.payload;
            if (action.payload && action.payload.length > 0) {
                state.selectedCityName = action?.payload[0]?.CityName;
                state.selectedCityId = action?.payload[0]?.CityId;
            }
          })
          .addCase(getAllCityList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export const { changeCity } = CityDetail.actions

export default CityDetail.reducer