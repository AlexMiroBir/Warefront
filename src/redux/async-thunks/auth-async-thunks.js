import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



// const config = require("../../config");
// //const API_URL_SERVER = config.API_URL_SERVER;
const API_URL_SERVER = process.env.REACT_APP_API_URL;
const token = `Bearer ${localStorage.getItem('currentUserToken')}`

axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosLogin = createAsyncThunk(
    'post/login',
    async ({Name, Password}, {rejectWithValue}) => {
        try {

            const {data} = await axios.post(API_URL_SERVER + "/api/user/login",
                {Name, Password})
            return data.token

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
            console.log(token)
            const response = await axios.get(API_URL_SERVER + "/api/user/logout", {
                headers: {
                    'Authorization': token
                }
            },)
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
    async ({Id, NewPassword}, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL_SERVER + "/api/user/changePassword", {
                Id,
                NewPassword
            }, {
                headers: {
                    'Authorization': token
                }
            },)
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