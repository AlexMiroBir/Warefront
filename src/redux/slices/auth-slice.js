import {createSlice} from "@reduxjs/toolkit";
import {axiosLogin, axiosLogOut, axiosChangePassword} from "../async-thunks/auth-async-thunks"


const AuthSlice = createSlice({

    name: 'auth-slice',
    initialState: {


        isAuthorized: '',
        username: '',
        id: '',
        status: '',
        message: {},



    },
    reducers: {


    },
    extraReducers: {

        [axiosLogin.pending]: (state, {payload}) => {
           // isLoading = true
        },
        [axiosLogin.fulfilled]: (state,{payload}) => {
            state.isAuthorized = true
            state.username = payload.Name
            state.id = payload.Id
            state.status = payload.Status
            state.message = {message: "Authorized"}


            localStorage.setItem("isAuthorized", "true");
            localStorage.setItem("currentUserName", payload.Name);
            localStorage.setItem("currentStatus", payload.Status);
            localStorage.setItem('currentUserId', payload.Id);
        },
        [axiosLogin.rejected]: (state, {payload}) => {
            state.isAuthorized = false
            state.username = false
            state.id = false
            state.status = false
            state.message = {message: payload}
         //   state.isLoading = 'false'
        },
        [axiosLogOut.pending]: (state, action) => {
          //  state.isLoading = true
        },
        [axiosLogOut.fulfilled]: (state, {payload}) => {
            state.isAuthorized = false
            state.username = false
            state.id = false
            state.status = false
            state.message = {message: "LogOut completed"}
         //   state.isLoading = false
            localStorage.clear()
        },
        [axiosLogOut.rejected]: (state, {payload}) => {
            state.message = {message: payload.error.message}
          //  state.isLoading = 'false'
        },
        [axiosChangePassword.pending]: (state, action) => {
         //   state.isLoading = true
        },
        [axiosChangePassword.fulfilled]: (state, {payload}) => {

            state.message = {message: "Password was changed successfully"}
          //  state.isLoading = false
        },
        [axiosChangePassword.rejected]: (state, {payload}) => {
            state.message = {message: payload.error.message}
           // state.isLoading = 'false'
        },

    }
})

export default AuthSlice.reducer
//export const {} = AuthSlice.actions

