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
        },
        [axiosLogin.fulfilled]: (state, {payload}) => {
            const userData = jwtDecode(payload)
            state.isAuthorized = true
            state.Username = userData.Name
            state.Id = userData.Id
            state.Status = userData.Status
            state.message = {message: "Authorized"}
            state.token = payload

        },
        [axiosLogin.rejected]: (state, {payload}) => {
            state.isAuthorized = false
            state.Username = false
            state.Id = false
            state.Status = false
            state.message = {message: payload}

        },
        [axiosLogOut.pending]: (state, action) => {

        },
        [axiosLogOut.fulfilled]: (state, {payload}) => {
            state.isAuthorized = false
            state.Username = false
            state.Id = false
            state.Status = false

        },
        [axiosLogOut.rejected]: (state, {payload}) => {
            state.message = {message: payload.error.message}
        },
        [axiosChangePassword.pending]: (state, action) => {
        },
        [axiosChangePassword.fulfilled]: (state, {payload}) => {
        },
        [axiosChangePassword.rejected]: (state, {payload}) => {
            state.message = {message: payload.error.message}
        },

    }
})

export default AuthSlice.reducer


