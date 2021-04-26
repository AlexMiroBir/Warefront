import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const API_URL_SERVER = process.env.REACT_APP_API_URL;
//const token = `Bearer ${localStorage.getItem('currentUserToken')}`


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetOrders = createAsyncThunk(
    'get/getOrders',
    async (args,{getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/order/orders",{
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

const axiosPickUpItem = createAsyncThunk(
    'put/pickUpItem',
    async (args, {getState,rejectWithValue}) => {
        const data = {...args}
        console.log(data)
        try {
            const token = getState().Auth.token
            const response = await axios.put(API_URL_SERVER + '/api/order/pickup',
                data, {
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
    axiosGetOrders,
    axiosPickUpItem

}