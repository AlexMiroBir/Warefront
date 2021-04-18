import React, {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

import SupplierInfoModal from "./supplier-info-modal/supplier-info-modal";
import ButtonGroupAddDeleteSuppliers from "./button-group-plus-modal/button-group";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles({
    buttonsDiv: {
        display: 'flex',
    }

});


const SuppliersTable = () => {

    const [selectionModel, setSelectionModel] = useState([]);
    const [globalFilterInput, setGlobalFilter] = useState("");

    const classes = useStyles()
    const suppliers = useSelector(state => state.SuppliersSlice.Suppliers)
    const status = useSelector(state => state.AuthSlice.Status)
    const isAdmin = status.toLowerCase() === "admin"


    const createObjForRow = (supplier) => {

        return {
            id: supplier.Id,
            name: supplier.Name,
            description: supplier.Description,
            phone: supplier.Phone,
            contactName: supplier.Contact_Name,
            info: supplier.Id
        }
    }


    const getFilteredArr = (suppliers) => {
        let arr = []
        suppliers.forEach(supplier => {
            let hasName = supplier.Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasDescription = supplier.Description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasPhone = supplier.Phone.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasContactName = supplier.Contact_Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasMatches = (hasName + hasDescription + hasPhone + hasContactName) > -4

            arr = hasMatches ?
                [...arr, createObjForRow(supplier)]
                :
                [...arr]
        })
        return arr
    }


    const getUnFilteredArr = (suppliers) => {
        let arr = []
        suppliers.forEach(supplier => {
            arr = [...arr, createObjForRow(supplier)]
        })
        return arr
    }


    const getSuppliersRows = (suppliers) => {

        return globalFilterInput ?
            [...getFilteredArr(suppliers)]
            :
            [...getUnFilteredArr(suppliers)]
    }


    const getSuppliersColumns = () => {
        const columns = [


            {
                field: 'name',
                headerName: "Name",
                description: "Name",
                flex: 1,
            },
            {
                field: 'description',
                headerName: "Description",
                description: "Description",
                flex: 1,
            },
            {
                field: 'phone',
                headerName: "Phone number",
                description: "Phone",
                flex: 1,
            },
            {
                field: 'contactName',
                headerName: "Contact Name",
                description: "Contact Name",
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
                renderCell: (params) => ( ///     TODO разобраться с кнопкой https://material-ui.com/components/data-grid/rendering/

                    <SupplierInfoModal supplierId={params.value}/>

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
                {isAdmin && <ButtonGroupAddDeleteSuppliers selectedSuppliersId={selectionModel}/>}
            </div>
            <DataGrid
                rows={getSuppliersRows(suppliers)}
                columns={getSuppliersColumns()}
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


export default SuppliersTable