import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_SERVER = process.env.REACT_APP_API_URL;
const token = `Bearer ${localStorage.getItem('currentUserToken')}`


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetSuppliers = createAsyncThunk(
    'get/getSuppliers',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/api/supplier/suppliers",{
                headers: {
                    'Authorization': token
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

const axiosEditSupplier = createAsyncThunk(
    'post/updateSupplier',
    async (row, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL_SERVER + "/api/supplier/createOrUpdateSupplier", row,{
                headers: {
                    'Authorization': token
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

const axiosDeleteSupplier = createAsyncThunk(
    'put/deleteSupplier',
    async (supplierId, {rejectWithValue}) => {
        try {
            const data = {id: supplierId}
            const response = await axios.put(API_URL_SERVER + "/api/supplier/delete", data,{
                headers: {
                    'Authorization': token
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
    axiosGetSuppliers,
    axiosEditSupplier,
    axiosDeleteSupplier
}