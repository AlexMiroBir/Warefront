import * as React from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";


const OrdersTable = () => {


    const orders = useSelector(state => state.OrdersSlice.orders)

    // function dateFormatter(cell, row) {
    //     return new Intl.DateTimeFormat('en-GB', {
    //         year: 'numeric', month: 'long', day: '2-digit',
    //         hour: 'numeric', minute: 'numeric', second: 'numeric',
    //         hour12: false, timeZone: 'Europe/Moscow'
    //     }).format(new Date(cell))
    //     // return `${('0' + cell.getDate()).slice(-2)}/${('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
    // }


    const getItemsRows = (items) => {
        console.log(items)
        let arr = []
        items.forEach(item => {
            const obj = {
                id: item.Id,
                item: item.Inventory_Name,
                description: item.Inventory_Description,
                qty: item.QTY,
                date: new Date(item.Date),
                operator: item.Operator,
                tool: item.Tool
            }

            arr.push(obj)

        })

        return arr
    }


    function getFormattedDate(date) {


        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]

         return (`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()},
          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

    }

    const getItemsColumns = () => {


        const columns = [

            // {
            //     field: 'id',
            //     headerName: "Id",
            //     description: "Id",
            //     width: 100
            // },
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
                type:'dateTime',
                valueFormatter: (params) => getFormattedDate(params.value),////TODO разобраться с сортировкой и фильтром по дате
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
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
                rows={getItemsRows(orders)}
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


export default OrdersTable