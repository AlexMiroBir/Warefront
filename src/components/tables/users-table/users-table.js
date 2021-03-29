import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import UserInfoModal from "./user-info-modal/user-info-modal";
import ButtonGroupAddDeleteUsers from "../users-table/button-group-plus-modal/button-group";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles({
    buttonsDiv: {
        display: 'flex',
    }

});


const UsersTable = () => {

    const classes = useStyles()

    const [selectionModel, setSelectionModel] = useState([]);
    const [globalFilterInput, setGlobalFilter] = useState("");


    const users = useSelector(state => state.UsersSlice.users)
    const status = useSelector(state => state.AuthSlice.status)
    const isAdmin = status.toLowerCase() === "admin"


    const createObjForRow = (user) => {
        const obj = {
            id: user.Id,
            name: user.Name,
            status: user.Status,
            phone: user.Phone,
            info: user.Id
        }
        return obj
    }


    const getFilteredArr = (users) => {
        let arr = []
        users.forEach(user => {
            const hasName = user.Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasStatus = user.Status.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasPhone = user.Phone.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())

            const hasMatches = (hasName + hasStatus + hasPhone) > -3

            arr = hasMatches ?
                [...arr, createObjForRow(user)]
                :
                [...arr]

        })
        return arr
    }


    const getUnFilteredArr = (users) => {
        let arr = []
        users.forEach(user => {
            arr = [...arr, createObjForRow(user)]
        })
        return arr
    }


    const getUsersRows = (users) => {

        return globalFilterInput ?
            [...getFilteredArr(users)]
            :
            [...getUnFilteredArr(users)]
    }


    const getItemsColumns = () => {
        const columns = [


            {
                field: 'name',
                headerName: "Name",
                description: "Name",
                flex: 1,
            },
            {
                field: 'status',
                headerName: "Status",
                description: "Status",
                flex: 1,
            },
            {
                field: 'phone',
                headerName: "Phone number",
                description: "Phone",
                flex: 1,
            },
            {
                field: 'info',
                headerName: "Info",
                description: "Info",
                width: 150,
                filterable: false,
                sortable: false,
                disableClickEventBubbling: true,
                renderCell: (params) => (

                    <UserInfoModal userId={params.value}/>

                ),
            },


        ]
        return columns
    }


    return (

        <div style={{height: 400, width: "100%"}}>
            <div className={classes.buttonsDiv}>
                <TextField
                    id="global-filter-input"
                    label="Global filter"
                    type="text"
                    variant="outlined"
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    value={globalFilterInput}
                    onKeyDown={(e) => e.stopPropagation()}
                />
                {isAdmin && <ButtonGroupAddDeleteUsers selectedUsersId={selectionModel}/>}
            </div>
            <DataGrid

                rows={getUsersRows(users)}
                columns={getItemsColumns()}
                pageSize={10}
                pagination
                rowsPerPageOptions={[5, 10, 50, 100]}
                checkboxSelection
                autoPageSize={false}
                components={{
                    Toolbar: GridToolbar,
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );
}


export default UsersTable