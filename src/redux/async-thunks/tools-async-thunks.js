import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const config = require("../../config");
const API_URL_SERVER = config.API_URL_SERVER;
axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios




const axiosGetTools = createAsyncThunk(
    'get/getTools',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/tools",)
            console.log(response.data)
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
    async (row, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL_SERVER + "/updateTool", row)
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
    async (toolId, {rejectWithValue}) => {
        try {
            const data = {Id: toolId}
            const response = await axios.put(API_URL_SERVER + "/deleteTool", data
            )
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