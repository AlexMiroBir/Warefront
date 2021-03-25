import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const config = require("../../config");
const API_URL_SERVER = config.API_URL_SERVER;


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetOrders = createAsyncThunk(
    'get/getOrders',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/transfers", )
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
    axiosGetOrders

}