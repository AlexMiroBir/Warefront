import {createSlice} from "@reduxjs/toolkit";
import {axiosGetUsers, axiosEditUser, axiosDeleteUser} from "../async-thunks/users-async-thunks"




const UsersSlice = createSlice({
    name: 'users-slice',
    initialState: {

        Users:[],


    },
    reducers: {
    },
    extraReducers: {

        [axiosGetUsers.pending]: (state, action) => {
           // state.isLoading = true
        },
        [axiosGetUsers.fulfilled]: (state, {payload}) => {
           // state.message = {message: "Data was received"}
          //  state.isLoading = false
            state.Users=payload
        },
        [axiosGetUsers.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosEditUser.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosEditUser.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosEditUser.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosDeleteUser.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosDeleteUser.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosDeleteUser.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },

    }
})

export default UsersSlice.reducer
//export const {} = AuthSlice.actions

