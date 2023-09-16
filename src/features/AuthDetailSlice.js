import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import authHeader from '../services/authHeader'

export const registerNewUser = createAsyncThunk('registerNewUser', async(body, { rejectWithValue }) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, body)
        return response
    } catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const signInUser = createAsyncThunk('signInUser', async(body, { rejectWithValue }) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/userLogin`, body)
        localStorage.setItem('userToken', response.data.token)
        localStorage.setItem('tokenExp', response.data.tokenExp)
        return response
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const updateUserDetail = createAsyncThunk('updateUserDetail', async(body, { rejectWithValue }) => {
    try{
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/updateUser/${body.UserId}`, body, { headers: authHeader() })
        return response
    } catch (err){
        return rejectWithValue(err.response.data)
    }
})

export const changeUserPassword = createAsyncThunk('changeUserPassword', async(params, { rejectWithValue }) => {
    const { body, UserId } = params

    try{
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/changePassword/${UserId}`, body, { headers: authHeader() })
        return response
    }catch(err){
        return rejectWithValue(err.response)
    }
})

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

export const AuthDetail = createSlice({
    name:'AuthDetail',
    initialState:{
        userToken:userToken,
        userInfo:null,
        isLoggedin:false,
        isEdit: false,
        loading:false,
        success:null,
        error:null
    },
    reducers: {
        editProfile: (state) => {
            state.isEdit = !state.isEdit
        },
        logoutUser: (state) => {
            state.userToken = null
            state.userInfo = null
            state.isLoggedin = false
            localStorage.removeItem("userToken");
            localStorage.removeItem("tokenExp");
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerNewUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerNewUser.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(registerNewUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(signInUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.userInfo = action.payload.data.user
            state.userToken = action.payload.data.token
            state.isLoggedin = true
            state.loading = false;
        })
        .addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(updateUserDetail.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUserDetail.fulfilled, (state, action) => {
            state.userInfo = action.payload.data.user
            state.loading = false;
        })
        .addCase(updateUserDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(changeUserPassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(changeUserPassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(changeUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const { editProfile, logoutUser } = AuthDetail.actions

export default AuthDetail.reducer