import {createSlice} from "@reduxjs/toolkit";
import {axiosGetOrders} from "../async-thunks/orders-async-thunks"



const OrdersSlice = createSlice({
    name: 'orders-slice',
    initialState: {

        orders:[],


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

            state.orders=payload

        },
        [axiosGetOrders.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
           // state.isLoading = 'false'
        },

    }
})

export default OrdersSlice.reducer
//export const {} = AuthSlice.actions

