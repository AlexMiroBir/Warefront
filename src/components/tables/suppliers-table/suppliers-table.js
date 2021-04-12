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
    const suppliers = useSelector(state => state.SuppliersSlice.suppliers)
    const role = useSelector(state => state.AuthSlice.role)
    const isAdmin = role.toLowerCase() === "admin"


    const createObjForRow = (supplier) => {
        const obj = {
            id: supplier.id,
            name: supplier.name,
            description: supplier.description,
            phone: supplier.phone,
            contactName: supplier.contact_name,
            info: supplier.id
        }
        return obj
    }


    const getFilteredArr = (suppliers) => {
        let arr = []
        suppliers.forEach(supplier => {
            let hasName = supplier.name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasDescription = supplier.description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasPhone = supplier.phone.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasContactName = supplier.contact_Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
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