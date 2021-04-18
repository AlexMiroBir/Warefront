import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_SERVER = process.env.REACT_APP_API_URL;
const token = `Bearer ${localStorage.getItem('currentUserToken')}`



axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetItems = createAsyncThunk(
    'get/getItems',
    async ({rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/api/item/items", {
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

const axiosGetItemData = createAsyncThunk(
    'get/getItemData',
    async (itemId, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/api/item/" + itemId,{
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

const axiosGetItemParameters = createAsyncThunk(
    'get/getItemParameters',
    async (itemId, {rejectWithValue}) => {
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
    async (itemId, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL_SERVER + "/data/suppliers/" + itemId)
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

const axiosEditItem = createAsyncThunk(
    'put/editItems',
    async (data, {rejectWithValue}) => {
        try {

            // let requestData = {};
            // let row = data.row;
            // // var newfilename = row.Filename;
            // // if (data.img != null) {
            // //     newfilename = generateUUID() + ".png";
            // //     formData.append('image', dataURLtoFile(data.img, newfilename));
            // // }
            // // formData.append('data', row);
            // if (row.Id === undefined) row.Id = -1;
            // for (let variable in data) {
            //     if (variable === 'img') continue;
            //     let value = data[variable];
            //     if (value !== undefined && value !== null) requestData[variable] = value;
            // }
            // for (let variable in row) {
            //     let value = row[variable];
            //     if (value !== undefined && value !== null) requestData[variable] = value;
            // }

            const response = await axios.put(API_URL_SERVER + '/api/item/update',
                data,{
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

const axiosDeleteItem = createAsyncThunk(
    'put/deleteItem',
    async (ItemId, {rejectWithValue}) => {
        try {
            const data = {Id: ItemId}
            const response = await axios.put(API_URL_SERVER + "/api/item/delete", data, {
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
    axiosGetItems,
    axiosGetItemData,
    axiosGetItemParameters,
    axiosGetItemSuppliers,
    axiosEditItem,
    axiosDeleteItem
}