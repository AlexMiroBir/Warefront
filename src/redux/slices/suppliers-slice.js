import {createSlice} from "@reduxjs/toolkit";
import {axiosGetSuppliers, axiosEditSupplier, axiosDeleteSupplier} from "../async-thunks/suppliers-async-thunks"



const SuppliersSlice = createSlice({
    name: 'suppliers-slice',
    initialState: {

        Suppliers:[],


    },
    reducers: {
    },
    extraReducers: {

        [axiosGetSuppliers.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetSuppliers.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
           // state.isLoading = false
            state.Suppliers=payload
        },
        [axiosGetSuppliers.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
          //  state.isLoading = 'false'
        },
        [axiosEditSupplier.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosEditSupplier.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosEditSupplier.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosDeleteSupplier.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosDeleteSupplier.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosDeleteSupplier.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },

    }
})

export default SuppliersSlice.reducer
//export const {} = AuthSlice.actions

