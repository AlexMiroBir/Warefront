import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_SERVER = process.env.REACT_APP_API_URL;
//const token = `Bearer ${localStorage.getItem('currentUserToken')}`


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetTools = createAsyncThunk(
    'get/getTools',
    async (args,{getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/tool/tools", {
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


const axiosEditTool = createAsyncThunk(
    'post/updateTool',
    async (row, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.post(API_URL_SERVER + "/api/tool/createOrUpdateTool", row, {
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

const axiosDeleteTool = createAsyncThunk(
    'put/deleteTool',
    async (toolId, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const data = {Id: toolId}
            const response = await axios.put(API_URL_SERVER + "/api/tool/delete", data, {
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


export {
    axiosGetTools,
    axiosEditTool,
    axiosDeleteTool

}