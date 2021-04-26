import {createSlice} from "@reduxjs/toolkit";
import {axiosGetOrders, axiosPickUpItem} from "../async-thunks/orders-async-thunks"



const OrdersSlice = createSlice({
    name: 'orders-slice',
    initialState: {

        Orders:[],


    },
    reducers: {
    },
    extraReducers: {

        [axiosGetOrders.pending]: (state, action) => {
            // state.isLoading = true
        },
        [axiosGetOrders.fulfilled]: (state, {payload}) => {
            // state.message = {message: "Data was received"}
            //  state.isLoading = false

            state.Orders=payload

        },
        [axiosGetOrders.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
           // state.isLoading = 'false'
        },
        [axiosPickUpItem.pending]: (state, action) => {
            // state.isLoading = true
        },
        [axiosPickUpItem.fulfilled]: (state, {payload}) => {
            // state.message = {message: "Data was received"}
            //  state.isLoading = false

            //state.orders=payload

        },
        [axiosPickUpItem.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
           // state.isLoading = 'false'
        },

    }
})

export default OrdersSlice.reducer
//export const {} = AuthSlice.actions

