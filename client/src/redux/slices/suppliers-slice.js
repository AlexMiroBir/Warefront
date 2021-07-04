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
            state.Suppliers=payload
        },
        [axiosGetSuppliers.rejected]: (state, {payload}) => {
        },
        [axiosEditSupplier.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosEditSupplier.fulfilled]: (state, {payload}) => {

        },
        [axiosEditSupplier.rejected]: (state, {payload}) => {

        },
        [axiosDeleteSupplier.pending]: (state, action,) => {

        },
        [axiosDeleteSupplier.fulfilled]: (state, {payload}) => {

        },
        [axiosDeleteSupplier.rejected]: (state, {payload}) => {

        },

    }
})

export default SuppliersSlice.reducer
//export const {} = AuthSlice.actions

