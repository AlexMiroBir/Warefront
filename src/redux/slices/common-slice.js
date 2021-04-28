import {createSlice} from "@reduxjs/toolkit";


const CommonSlice = createSlice({
    name: 'common-slice',
    initialState: {

        message: {},
        isLoading: false,
        loadingLabel:""

    },
    reducers: {
        startLoading: {
            reducer: (state, action) => {
                state.isLoading = true
                state.loadingLabel=action.payload
            }
        },
        stopLoading: {
            reducer: (state, action) => {
                state.isLoading = false
                state.message = {message: action.payload}
            }
        },
        setMessage: {
            reducer: (state, action) => {
                state.message = {message: action.payload}
            }
        },


    },
    extraReducers: {}
})

export default CommonSlice.reducer
export const {startLoading, stopLoading,setMessage} = CommonSlice.actions

