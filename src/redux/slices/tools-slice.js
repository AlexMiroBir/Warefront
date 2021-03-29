import {createSlice} from "@reduxjs/toolkit";
import {axiosEditTool, axiosGetTools, axiosDeleteTool} from "../async-thunks/tools-async-thunks"


const ToolsSlice = createSlice({
    name: 'tools-slice',
    initialState: {

        tools: [],



    },
    reducers: {

    },
    extraReducers: {

        [axiosGetTools.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosGetTools.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.tools = payload
        },
        [axiosGetTools.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosEditTool.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosEditTool.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosEditTool.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosDeleteTool.pending]: (state, action,) => {
            state.isLoading = true
        },
        [axiosDeleteTool.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            // state.tools=payload
        },
        [axiosDeleteTool.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },

    }
})

export default ToolsSlice.reducer
export const {

    setCurrentToolData

} = ToolsSlice.actions

