//
// const AuthSlice = createSlice({
//     name: 'auth-slice',
//     initialState: {
//         isAuthorized: '',
//         username: '',
//     },
//     extraReducers: {
//
//         [axiosLogin.pending]: (state, action) => {
//             CommonSlice.state.isLoading = true
//         },
//         [axiosLogin.fulfilled]: (state, {payload}) => {
//             state.isAuthorized = true
//             CommonSlice.state.isLoading = false
//         },
//         [axiosLogin.rejected]: (state, {payload}) => {
//             state.isLoading = 'false'
//         },
//     }
// })
//
// const CommonSlice = createSlice({
//     name: 'common-slice',
//     initialState: {
//         isLoading: '',
//     },
//     reducers: {
//     },
//     extraReducers: {
//
//     }
// })
//
