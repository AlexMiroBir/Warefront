import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import FormData from 'form-data'


const API_URL_SERVER = process.env.REACT_APP_API_URL;
//const token = `Bearer ${localStorage.getItem('currentUserToken')}`


axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios


const axiosGetItems = createAsyncThunk(
    'get/getItems',
    async (args, {getState, rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/item/items", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                },
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

const axiosGetItemData = createAsyncThunk(
    'get/getItemData',
    async (itemId, {getState, rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/item/" + itemId, {
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

// const axiosGetItemParameters = createAsyncThunk(
//     'get/getItemParameters',
//     async (itemId, {rejectWithValue}) => {
//         try {
//
//             const response = await axios.get(API_URL_SERVER + "/data/parameters/" + itemId,)
//             console.log(response)
//             return response.data
//         } catch (err) {
//             let error = err // cast the error for access
//             if (!error.response) {
//                 throw err
//             }
//             return rejectWithValue(error.response.data)
//         }
//     }
// )
//
//
// const axiosGetItemSuppliers = createAsyncThunk(
//     'get/getItemSuppliers',
//     async (itemId, {rejectWithValue}) => {
//         try {
//             const response = await axios.get(API_URL_SERVER + "/data/suppliers/" + itemId)
//             console.log(response)
//             return response.data
//         } catch (err) {
//             let error = err // cast the error for access
//             if (!error.response) {
//                 throw err
//             }
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

const axiosEditItem = createAsyncThunk(
    'put/editItems',
    async (data, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.put(API_URL_SERVER + '/api/item/update',
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

const axiosDeleteItem = createAsyncThunk(
    'put/deleteItem',
    async (ItemId, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const data = {Id: ItemId}
            const response = await axios.put(API_URL_SERVER + "/api/item/delete", data, {
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
const axiosAddImage = createAsyncThunk(
    'put/addImage',
    async ({ItemId, File}, {getState,rejectWithValue}) => {

        try {
            const token = getState().Auth.token
            const Id = ItemId
            let data = new FormData()
            data.append('Id', Id)
            data.append('File', File)

            const response = await axios.put(API_URL_SERVER + "/api/item/addImage", data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`,
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

const axiosGetAvatars = createAsyncThunk(
    'get/getAvatars',
    async (args,{getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/item/images/avatars", {
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

const axiosGetItemImages = createAsyncThunk(
    'get/getItemImages',
    async (itemId, {getState,rejectWithValue}) => {
        try {
            const token = getState().Auth.token
            const response = await axios.get(API_URL_SERVER + "/api/item/itemImages/" + itemId, {
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

const axiosSetAvatar = createAsyncThunk(
    'put/setAvatar',
    async ({itemId, pictId}, {getState,rejectWithValue}) => {

        try {
            const token = getState().Auth.token
            const data = {Id: itemId, PictId:pictId}

            const response = await axios.put(API_URL_SERVER + "/api/item/setAvatar", data, {
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

const axiosDeleteImage = createAsyncThunk(
    'put/deleteImage',
    async (Id, {getState,rejectWithValue}) => {

        try {
            const token = getState().Auth.token
            const data = {Id}

            const response = await axios.put(API_URL_SERVER + "/api/item/images/delete", data, {
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
    axiosGetItems,
    axiosGetItemData,
    // axiosGetItemParameters,
    // axiosGetItemSuppliers,
    axiosEditItem,
    axiosDeleteItem,
    axiosAddImage,
    axiosGetAvatars,
    axiosGetItemImages,
    axiosSetAvatar,
    axiosDeleteImage
}