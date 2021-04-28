import {createSlice} from "@reduxjs/toolkit";
import {
    axiosDeleteItem,
    axiosEditItem,
    axiosGetItemData,
  //  axiosGetItemParameters,
    axiosGetItems,
   // axiosGetItemSuppliers,
    axiosGetAvatars,
    axiosGetItemImages
} from "../async-thunks/items-async-thunks"


const ItemsSlice = createSlice({
    name: 'items-slice',
    initialState: {

        Items: [],
        ItemData: {},
        Avatars:[],
        ItemImages:[],



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
    // reducers: {
    //
    //     needUpdateItem: {
    //         reducer: (state, action) => {
    //             state.responseDataToSave.needUpdateItem = true
    //         }
    //     },
    //     needUpdateParameters: {
    //         reducer: (state, action) => {
    //             state.responseDataToSave.needUpdateParameters = true
    //         }
    //     },
    //     needUpdateSuppliers: {
    //         reducer: (state, action) => {
    //             state.responseDataToSave.needUpdateSuppliers = true
    //         }
    //     },
    //     addToCandidatesToUpdateMainItemData: {
    //         reducer: (state, {payload}) => {
    //             state.candidatesToUpdate.itemData = payload
    //         }
    //     },
    //     addToCandidatesToUpdateParameters: {
    //         reducer: (state, {payload}) => {
    //             state.candidatesToUpdate.parameters = payload
    //         }
    //     },
    //
    //
    // },
    extraReducers: {

        [axiosGetItems.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItems.fulfilled]: (state, {payload}) => {
            state.message = {message: "Data was received"}
            state.isLoading = false
            state.Items = payload
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
            state.ItemData=payload

        },
        [axiosGetItemData.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        // [axiosGetItemParameters.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [axiosGetItemParameters.fulfilled]: (state, {payload}) => {
        //     state.message = {message: "Data was received"}
        //     state.isLoading = false
        //
        // },
        // [axiosGetItemParameters.rejected]: (state, {payload}) => {
        //     //  state.message = {message: payload.error.message}
        //     state.isLoading = 'false'
        // },
        // [axiosGetItemSuppliers.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [axiosGetItemSuppliers.fulfilled]: (state, {payload}) => {
        //     state.message = {message: "Data was received"}
        //     state.isLoading = false
        //     state.itemData.suppliers = payload
        // },
        // [axiosGetItemSuppliers.rejected]: (state, {payload}) => {
        //     //  state.message = {message: payload.error.message}
        //     state.isLoading = 'false'
        // },
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
        [axiosGetAvatars.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetAvatars.fulfilled]: (state, {payload}) => {
            state.message = {message: "Avatars were received"}
            state.isLoading = false
            state.Avatars = payload
        },
        [axiosGetAvatars.rejected]: (state, {payload}) => {
            //  state.message = {message: payload.error.message}
            state.isLoading = 'false'
        },
        [axiosGetItemImages.pending]: (state, action) => {
            state.isLoading = true
        },
        [axiosGetItemImages.fulfilled]: (state, {payload}) => {
            state.message = {message: "Images was received"}
            state.isLoading = false
            state.ItemImages = payload
        },
        [axiosGetItemImages.rejected]: (state, {payload}) => {
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

