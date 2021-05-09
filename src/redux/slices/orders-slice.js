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
        },
        [axiosGetOrders.fulfilled]: (state, {payload}) => {
                  state.Orders=payload

        },
        [axiosGetOrders.rejected]: (state, {payload}) => {

        },
        [axiosPickUpItem.pending]: (state, action) => {

        },
        [axiosPickUpItem.fulfilled]: (state, {payload}) => {

        },
        [axiosPickUpItem.rejected]: (state, {payload}) => {

        },

    }
})

export default OrdersSlice.reducer


