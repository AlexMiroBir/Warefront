import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const config = require("../../config");
const API_URL_SERVER = config.API_URL_SERVER;


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosLogin = createAsyncThunk(
    'post/login',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL_SERVER + "/login", {username, password})
            // console.log(response)
            return response.data
        } catch (err) {
            let error = err // cast the error for access
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const axiosLogOut = createAsyncThunk(
    'get/logOut',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/logout",)
            console.log(response)
            return response.data
        } catch (err) {
            let error = err // cast the error for access
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const axiosChangePassword = createAsyncThunk(
    'post/ChangePassword',
    async ({userId, newpassword}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL_SERVER + "/changePassword", {
                Id: userId,
                Password: newpassword
            })
            console.log(response)
            return response.data
        } catch (err) {
            let error = err // cast the error for access
            if (!error.response) {
                throw err
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export {
    axiosLogin,
    axiosLogOut,
    axiosChangePassword,

}