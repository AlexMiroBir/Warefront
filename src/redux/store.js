import {combineReducers, configureStore} from "@reduxjs/toolkit"
import CommonSlice from "./slices/common-slice"
import AuthSlice from "./slices/auth-slice"
import ItemsSlice from "./slices/items-slice"
import ToolsSlice from "./slices/tools-slice"
import SuppliersSlice from "./slices/suppliers-slice"
import UsersSlice from "./slices/users-slice"
import OrdersSlice from "./slices/orders-slice"





const rootReducer = combineReducers({
    CommonSlice,
    AuthSlice,
    ItemsSlice,
    ToolsSlice,
    SuppliersSlice,
    OrdersSlice,
    UsersSlice



})




const store = configureStore({
    reducer: rootReducer
})



export default store