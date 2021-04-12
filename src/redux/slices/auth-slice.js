import {createSlice} from "@reduxjs/toolkit";
import {axiosChangePassword, axiosLogin, axiosLogOut} from "../async-thunks/auth-async-thunks"
import jwtDecode from "jwt-decode";

const AuthSlice = createSlice({

    name: 'auth-slice',
    initialState: {


        isAuthorized: '',
        username: '',
        id: '',
        role: '',
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
            state.username = userData.name
            state.id = userData.id
            state.role = userData.role
            state.message = {message: "Authorized"}
            state.token = payload


            localStorage.setItem("isAuthorized", "true");
            localStorage.setItem("currentUserName", userData.name);
            localStorage.setItem("currentRole", userData.role);
            localStorage.setItem('currentUserId', userData.id);
            localStorage.setItem('currentUserToken', payload);
        },
        [axiosLogin.rejected]: (state, {payload}) => {
            state.isAuthorized = false
            state.username = false
            state.id = false
            state.role = false
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
            state.role = false
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

