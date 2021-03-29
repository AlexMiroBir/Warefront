import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    buttonsDiv: {
        display: 'flex',
    }

});


const OrdersTable = () => {

    const classes = useStyles()

    const [globalFilterInput, setGlobalFilter] = useState("");

    const orders = useSelector(state => state.OrdersSlice.orders)

    const getFormattedDate = (date) => {

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        console.log(monthNames[date.getMonth()])

        return (`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()},
          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    }


    // const createObjForRow = (items) => {
    //     console.log(items)
    //     let arr = []
    //     items.forEach(item => {
    //         const obj = {
    //             id: item.Id,
    //             item: item.Inventory_Name,
    //             description: item.Inventory_Description,
    //             qty: item.QTY,
    //             date: new Date(item.Date),
    //             operator: item.Operator,
    //             tool: item.Tool
    //         }
    //
    //         arr.push(obj)
    //
    //     })
    //
    //     return arr
    // }


    const createObjForRow = (order) => {
        const obj = {
            id: order.Id,
            item: order.Inventory_Name,
            description: order.Inventory_Description,
            qty: order.QTY,
            date: new Date(order.Date),
            operator: order.Operator,
            tool: order.Tool
        }
        return obj
    }


    const getFilteredArr = (orders) => {
        let arr = []
        orders.forEach(order => {
            let hasItem = order.Inventory_Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasDescription = order.Inventory_Description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasQty = order.QTY.toString().indexOf(globalFilterInput.toLowerCase().trim())
            let hasDate = getFormattedDate(new Date(order.Date)).toString().toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasOperator = order.Operator.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            let hasTool = order.Tool.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())

            let hasMatches = (hasItem + hasDescription + hasQty + hasDate + hasOperator + hasTool) > -6

            arr = hasMatches ?
                [...arr, createObjForRow(order)]
                :
                [...arr]
        })
        return arr
    }

    const getUnFilteredArr = (orders) => {
        let arr = []
        orders.forEach(order => {
            arr = [...arr, createObjForRow(order)]
        })
        return arr
    }


    const getOrdersRows = (orders) => {

        return globalFilterInput ?
            [...getFilteredArr(orders)]
            :
            [...getUnFilteredArr(orders)]
    }


    const getOrdersColumns = () => {


        const columns = [

            {
                field: 'item',
                headerName: "Item",
                description: "Item",
                flex: 1,
            },
            {
                field: 'description',
                headerName: "Item (Description)",
                description: "Description",
                flex: 1,
            },

            {
                field: "qty",
                headerName: "QTY",
                description: "QTY",
                width: 110
            },
            {
                field: "date",
                headerName: "Date",
                description: "Date",
                type: 'dateTime',
                valueFormatter: (params) => getFormattedDate(params.value),////TODO разобраться с сортировкой и фильтром по дате, вообще беда
                flex: 1,
            },
            {
                field: "operator",
                headerName: "Operator",
                description: "Operator",
                width: 130
            },
            {
                field: "tool",
                headerName: "Tool",
                description: "Tool",
                width: 140
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
            </div>
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
                rows={getOrdersRows(orders)}
                columns={getOrdersColumns()}
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


export default OrdersTable