import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const config = require("../../config");
const API_URL_SERVER = config.API_URL_SERVER;


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetItems = createAsyncThunk(
    'get/getItems',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/data",)
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

const axiosGetItemData = createAsyncThunk(
    'get/getItemData',
    async (itemId,{rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/data/item/" + itemId,)
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

const axiosGetItemParameters = createAsyncThunk(

    'get/getItemParameters',
    async (itemId,{rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/data/parameters/" + itemId,)
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


const axiosGetItemSuppliers = createAsyncThunk(

    'get/getItemSuppliers',
    async (itemId,{rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/data/suppliers/" + itemId,)
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
    axiosGetItems,
    axiosGetItemData,
    axiosGetItemParameters,
    axiosGetItemSuppliers
}