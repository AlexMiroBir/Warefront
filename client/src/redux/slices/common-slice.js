import {createSlice} from "@reduxjs/toolkit";


const CommonSlice = createSlice({
    name: 'common-slice',
    initialState: {

        message: {
            msg: 'initialization',
            variant: 'info',
            date: ''
        },
        isLoading: false,
        loadingLabel: ""

    },
    reducers: {
        startLoading: {
            reducer: (state, {payload}) => {
                state.isLoading = true
                state.loadingLabel = payload
            }
        },
        stopLoading: {
            reducer: (state, {payload}) => {
                state.isLoading = false
                state.message.msg = payload.msg
                state.message.variant = payload.variant
                state.message.date = Date.now()

            }
        },
        setMessage: {
            reducer: (state, {payload}) => {
                state.message.msg = payload.msg
                state.message.variant = payload.variant
                state.message.date = Date.now()
            }
        },


    },
    extraReducers: {}
})

export default CommonSlice.reducer
export const {startLoading, stopLoading, setMessage} = CommonSlice.actions

