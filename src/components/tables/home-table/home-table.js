import * as React from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import ImageModal from "./image-modal";
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosGetItemData} from "../../../redux/async-thunks/items-async-thunks";


//import {makeStyles} from "@material-ui/core/styles";
import monitor from '../../../images/03d1a674-b686-4c00-a13f-2e8929503f40.png'
import {useHistory} from "react-router-dom";
import ShowInfoModal from "./show-info-modal/show-info-modal";



// TODO выделять ячйки с нарушенным неснижаемым остатком

const HomeTable = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const items = useSelector(state => state.ItemsSlice.items)
    const itemData = useSelector(state => state.ItemsSlice.itemData.data)


    const getItemsRows = (items) => {
        console.log(items)
        let arr = []
        items.forEach(item => {
            const obj = {
                id: item.Id,
                name: item.Name,
                description: item.Description,
                bCode: item.Inventory_BCode,
                qty: item.QTY_In_Stock,
                qtyMin: item.QTY_Min,
                location: item.Location,
                tool: item.Tool,
                info:item.Id,
            }

            arr.push(obj)

        })

        return arr
    }



    const getItemsColumns = () => {
        const columns = [
            {
                field: 'Image',
                headerName: "Image",
                description: "Avatar",
                width: 100,
                filterable: false,
                sortable: false,
                disableClickEventBubbling: true,
                renderCell: () => ( ///     TODO разобраться с картинками  в скобках было (GridCellParams)  https://material-ui.com/components/data-grid/rendering/

                    // <img className={classes.avatar} src={monitor} onClick={()=>showImageModal()}/>
                    <ImageModal imgSrc={monitor}/>
                ),
            },
            // {
            //     field: 'id',
            //     headerName: "Id",
            //     description: "Id",
            //     width: 100
            // },
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
                field: "bCode",
                headerName: "BCode",
                description: "BCode",
                flex: 1,
            },
            {
                field: "qty",
                headerName: "QTY",
                description: "QTY",
                width: 110
            },
            {
                field: "qtyMin",
                headerName: "QTY_MIN",
                description: "QTY_MIN",
                width: 140
            },
            {
                field: "location",
                headerName: "Location",
                description: "Location",
                width: 130
            },
            {
                field: "tool",
                headerName: "Tool",
                description: "Tool",
                width: 140
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


                    <ShowInfoModal itemId={params.value} />


                ),
            },

        ]
        return columns
    }


    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
                rows={getItemsRows(items)}
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


export default HomeTable