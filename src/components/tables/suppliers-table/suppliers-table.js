import * as React from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

import SupplierInfoModal from "./supplier-info-modal/supplier-info-modal";
import ButtonGroupAddDelete from "./button-group";


const useStyles = makeStyles({
    button: {
        //  width: '200px'
    },

});


const SuppliersTable = () => {

    const classes = useStyles()
    const suppliers = useSelector(state => state.SuppliersSlice.suppliers)


    const getSuppliersRows = (suppliers) => {

        let arr = []
        suppliers.forEach(suppler => {

            const obj = {
                id: suppler.Id,
                name: suppler.Name,
                description: suppler.Description,
                phone: suppler.Phone,
                contactName: suppler.Contact_Name,
                info:suppler.Id

            }
            arr.push(obj)
        })

        return arr
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

                    <SupplierInfoModal supplierId={params.value} />

                ),
            },


        ]
        return columns
    }


    return (
        <div style={{height: 400, width: "100%"}}>
            <ButtonGroupAddDelete/>
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
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
            />
        </div>
    );
}


export default SuppliersTable