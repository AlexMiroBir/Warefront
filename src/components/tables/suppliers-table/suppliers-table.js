import * as React from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    button: {
        //  width: '200px'
    },

});


const SuppliersTable = () => {

    const classes = useStyles()
    const suppliers = useSelector(state => state.SuppliersSlice.suppliers)


    const getItemsRows = (items) => {
        console.log(items)
        let arr = []
        items.forEach(item => {
            const obj = {
                id: item.Id,
                name: item.Name,
                description: item.Description,
                phone: item.Phone,
                contactName: item.Contact_Name,
                //bCode: item.Inventory_BCode,
                //qty: item.QTY_In_Stock,
                //qtyMin: item.QTY_Min,
                //location: item.Location,
                //tool: item.Tool
            }

            arr.push(obj)

        })

        return arr
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
                field: 'Info',
                headerName: "Info",
                description: "Info",
                width: 150,
                filterable: false,
                sortable: false,
                disableClickEventBubbling: true,
                renderCell: () => ( ///     TODO разобраться с кнопкой https://material-ui.com/components/data-grid/rendering/

                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginLeft: 16}}
                    >
                        Show info
                    </Button>

                ),
            },


        ]
        return columns
    }


    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
                rows={getItemsRows(suppliers)}
                columns={getItemsColumns()}
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