import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const API_URL_SERVER = process.env.REACT_APP_API_URL;
//const token = `Bearer ${localStorage.getItem('currentUserToken')}`


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetUsers = createAsyncThunk(
    'get/getUsers',
    async (args,{getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/user/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },)

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

const axiosEditUser = createAsyncThunk(
    'post/updateUser',
    async (row, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.post(API_URL_SERVER + "/api/user/addOrUpdateUser", row,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },)
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

const axiosDeleteUser = createAsyncThunk(
    'put/deleteUser',
    async (userId, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const data = {Id: userId}
            const response = await axios.put(API_URL_SERVER + "/api/user/delete", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },)
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


export {
    axiosGetUsers,
    axiosEditUser,
    axiosDeleteUser

}