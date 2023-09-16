import { createSlice } from '@reduxjs/toolkit'

export const App = createSlice({
    name:'App',
    initialState: {
        currentPath: '/',
        ticketTab:'Active',
        isSuccessMessage:false,
        successMessage:null,
        isWarningMessage:false,
        warningMessage:null,
        isErrorMessage: false,
        errorMessage:null,
    },
    reducers: {
        changeCurrentPath: (state, action) => {
            state.currentPath = action.payload
        },
        handleChangeTicketTab: (state, action) => {
            state.ticketTab = action.payload
        },
        handleSuccessModal: (state, action) => {
            state.isSuccessMessage = !state.isSuccessMessage
            state.successMessage = action.payload
        },
        handleWarningModal: (state, action) => {
            state.isWarningMessage = action.payload.isOpen
            state.warningMessage = action.payload.message
        },
        openErrorModal: (state, action) => {
            state.isErrorMessage = !state.isErrorMessage || action.payload
        },
        handleErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    }
})

export const { changeCurrentPath, handleChangeTicketTab, handleSuccessModal, openErrorModal, handleErrorMessage, handleWarningModal } = App.actions

export default App.reducer