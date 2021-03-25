// import {createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";
//
// const config = require("../../config");
// const API_URL_SERVER = config.API_URL_SERVER;
// axios.defaults.withCredentials = true;  ////TODO разобраться с этим https://github.com/axios/axios
//
// // const fetchRegister = createAsyncThunk(
// //     'post/register',
// //     async ({email, password}, {getState, rejectWithValue}) => {
// //         try {
// //             const response = await METHOD.post('api/registration', {email, password})
// //             return response.data
// //         } catch (err) {
// //             let error = err // cast the error for access
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
// //
//
//
// const axiosLogin = createAsyncThunk(
//     'post/login',
//     async ({username, password}, {rejectWithValue}) => {
//         try {
//             const response = await axios.post(API_URL_SERVER + "/login", {username, password})
//            // console.log(response)
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
// const axiosLogOut = createAsyncThunk(
//     'get/logOut',
//     async ({rejectWithValue}) => {
//         try {
//             const response = await axios.get(API_URL_SERVER + "/logout",)
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
// const axiosChangePassword = createAsyncThunk(
//     'post/ChangePassword',
//     async ({userId, newpassword}, {rejectWithValue}) => {
//         try {
//             const response = await axios.post(API_URL_SERVER + "/changePassword", {
//                 Id: userId,
//                 Password: newpassword
//             })
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
// const axiosGetItems = createAsyncThunk(
//     'get/getItems',
//     async ({rejectWithValue}) => {
//         try {
//             const response = await axios.get(API_URL_SERVER + "/data",)
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
// const axiosGetTools = createAsyncThunk(
//     'get/getTools',
//     async ({rejectWithValue}) => {
//         try {
//             const response = await axios.get(API_URL_SERVER + "/tools",)
//             console.log(response.data)
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
// //
// //
// // const fetchNewContact = createAsyncThunk(
// //     'post/contact',
// //     async (contact, {getState, rejectWithValue}) => {
// //         try {
// //             const token = getState().toolkit.token
// //             const response = await METHOD.post('api/contact', contact, {Authorization: token})
// //             console.log(response.data)
// //             return response.data
// //         } catch (err) {
// //             let error = err // cast the error for access
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
// //
// // const fetchExistContact = createAsyncThunk(
// //     'put/contactUpdate',
// //     async (contact, {getState, rejectWithValue}) => {
// //         try {
// //             const token = getState().toolkit.token
// //             const response = await METHOD.put('api/contact', contact, {Authorization: token})
// //             return response.data
// //         } catch (err) {
// //             let error = err // cast the error for access
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
// //
// // const fetchAllContacts = createAsyncThunk(
// //     'get/allContacts',
// //     async (contacts, {getState, rejectWithValue}) => {
// //         try {
// //             const token = getState().toolkit.token
// //             const response = await METHOD.get('api/contact', {Authorization: token})
// //             return response.contacts
// //         } catch (err) {
// //             let error = err // cast the error for access
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
// //
// // const fetchDelContactById = createAsyncThunk(
// //     'delete/contact',
// //     async (id, {getState, rejectWithValue}) => {
// //         try {
// //             const token = getState().toolkit.token
// //             const response = await METHOD.deleteRequest(`api/contact/${id}`, {Authorization: token})
// //             return response.data
// //         } catch (err) {
// //             let error = err // cast the error for acces
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
// //
// // const fetchDelAllContacts = createAsyncThunk(
// //     'delete/contact',
// //     async (id, {getState, rejectWithValue}) => {
// //         try {
// //             const token = getState().toolkit.token
// //             const response = await METHOD.deleteRequest(`api/clear`, {Authorization: token})
// //             return response.data
// //         } catch (err) {
// //             let error = err // cast the error for acces
// //             if (!error.response) {
// //                 throw err
// //             }
// //             return rejectWithValue(error.response.data)
// //         }
// //     }
// // )
//
//
// export {
//     // fetchNewContact,
//     // fetchAllContacts,
//     // fetchExistContact,
//     // fetchDelContactById,
//     // fetchRegister,
//     axiosLogin,
//     axiosLogOut,
//     axiosChangePassword,
//     axiosGetItems,
//     axiosGetTools
//     // fetchDelAllContacts
// }