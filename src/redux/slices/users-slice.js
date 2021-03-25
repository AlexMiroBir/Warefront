import {createSlice} from "@reduxjs/toolkit";
import {axiosGetUsers} from "../async-thunks/users-async-thunks"



const UsersSlice = createSlice({
    name: 'items-slice',
    initialState: {

        users:[],


    },
    reducers: {
    },
    extraReducers: {

        [axiosGetUsers.pending]: (state, action) => {
           // state.isLoading = true
        },
        [axiosGetUsers.fulfilled]: (state, {payload}) => {
           // state.message = {message: "Data was received"}
          //  state.isLoading = false
            state.users=payload
        },
        [axiosGetUsers.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },

    }
})

export default UsersSlice.reducer
//export const {} = AuthSlice.actions

