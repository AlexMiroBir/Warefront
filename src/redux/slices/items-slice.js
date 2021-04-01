import {createSlice} from "@reduxjs/toolkit";
import {
    axiosDeleteItem,
    axiosEditItem,
    axiosGetItemData,
    axiosGetItemParameters,
    axiosGetItems,
    axiosGetItemSuppliers
} from "../async-thunks/items-async-thunks"


const ItemsSlice = createSlice({
    name: 'items-slice',
    initialState: {

        items: [],
        itemData: {
            data: {},
            parameters: {},
            suppliers: {}
        },

        responseDataToSave: {
            row: {},
            needUpdateItem: false,
            needUpdateParameters: false,
            needUpdateSuppliers: false,
            parametersTable: [],
            suppliersTable: [] //JSON.stringify(suppliers)
        },

        candidatesToUpdate:{
            itemData:{},
            parameters:{},
        }


    },
    reducers: {

        needUpdateItem: {
            reducer: (state, action) => {
                state.responseDataToSave.needUpdateItem = true
            }
        },
        needUpdateParameters: {
            reducer: (state, action) => {
                state.responseDataToSave.needUpdateParameters = true
            }
        },
        needUpdateSuppliers: {
            reducer: (state, action) => {
                state.responseDataToSave.needUpdateSuppliers = true
            }
        },
        addToCandidatesToUpdateMainItemData: {
            reducer: (state, {payload}) => {
                state.candidatesToUpdate.itemData = payload
            }
        },
        addToCandidatesToUpdateParameters: {
            reducer: (state, {payload}) => {
                state.candidatesToUpdate.parameters = payload
            }
        },


    },
    extraReducers: {

        [axiosGetItems.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItems.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.items = JSON.parse(payload.data).items
        },
        [axiosGetItems.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosGetItemData.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItemData.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.itemData.data = JSON.parse(JSON.parse(payload.data).item) ///TODO странно как-то выглядет
        },
        [axiosGetItemData.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosGetItemParameters.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItemParameters.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.itemData.parameters = payload
        },
        [axiosGetItemParameters.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosGetItemSuppliers.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItemSuppliers.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.itemData.suppliers = payload
        },
        [axiosGetItemSuppliers.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosEditItem.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosEditItem.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
          //  state.itemData.suppliers = payload
        },
        [axiosEditItem.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosDeleteItem.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosDeleteItem.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
          //  state.itemData.suppliers = payload
        },
        [axiosDeleteItem.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },

    }
})

export default ItemsSlice.reducer

export const {
    needUpdateItem,
    needUpdateParameters,
    needUpdateSuppliers,
    addToCandidatesToUpdateMainItemData,
    addToCandidatesToUpdateParameters

} = ItemsSlice.actions

