import {createSlice} from "@reduxjs/toolkit";
import {axiosChangePassword, axiosLogin, axiosLogOut} from "../async-thunks/auth-async-thunks"
import jwtDecode from "jwt-decode";

const AuthSlice = createSlice({

    name: 'auth-slice',
    initialState: {


        isAuthorized: '',
        Username: '',
        Id: '',
        Status: '',
        message: {},
        token: '',


    },
    reducers: {},
    extraReducers: {

        [axiosLogin.pending]: (state, {payload}) => {
            // isLoading = true
        },
        [axiosLogin.fulfilled]: (state, {payload}) => {
            const userData = jwtDecode(payload)
            state.isAuthorized = true
            state.Username = userData.Name
            state.Id = userData.Id
            state.Status = userData.Status
            state.message = {message: "Authorized"}
            state.token = payload


            localStorage.setItem("isAuthorized", "true");
            localStorage.setItem("currentUserName", userData.Name);
            localStorage.setItem("currentStatus", userData.Status);
            localStorage.setItem('currentUserId', userData.Id);
            localStorage.setItem('currentUserToken', payload);
        },
        [axiosLogin.rejected]: (state, {payload}) => {
            state.isAuthorized = false
            state.Username = false
            state.Id = false
            state.Status = false
            state.message = {message: payload}
            //   state.isLoading = 'false'
        },
        [axiosLogOut.pending]: (state, action) => {
            //  state.isLoading = true
        },
        [axiosLogOut.fulfilled]: (state, {payload}) => {
            state.isAuthorized = false
            state.Username = false
            state.Id = false
            state.Status = false
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

