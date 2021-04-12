import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import ImageModal from "./image-modal";


import {makeStyles} from "@material-ui/core/styles";
import monitor from '../../../images/03d1a674-b686-4c00-a13f-2e8929503f40.png'
import ItemInfoModal from "./show-info-modal/item-info-modal";

import TextField from "@material-ui/core/TextField";
import ButtonGroupAddDeleteItems from "./button-group-plus-modal/button-group";


const useStyles = makeStyles({
    buttonsDiv: {
        display: 'flex',
    }

});


// TODO выделять ячйки с нарушенным неснижаемым остатком

const HomeTable = () => {

    const classes = useStyles()

    const [selectionModel, setSelectionModel] = useState([]);
    const [globalFilterInput, setGlobalFilter] = useState("");

    const items = useSelector(state => state.ItemsSlice.items)
    // const itemData = useSelector(state => state.ItemsSlice.itemData.data)
    const role = useSelector(state => state.AuthSlice.role)
    const isAdmin = role.toLowerCase() === "admin"



    const createObjForRow = (item) => {
        const obj = {
            id: item.Id,
            name: item.Name,
            description: item.Description,
            bCode: item.Inventory_BCode,
            qty: item.QTY_In_Stock,
            qtyMin: item.QTY_Min,
            location: item.Location,
            tool: item.Tool,
            info: item.Id,
        }
        return obj
    }


    const getFilteredArr = (items) => {
        let arr = []
        items.forEach(item => {
            const hasName = item.Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasDescription = item.Description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasBCode = item.Inventory_BCode.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasTool = item.Tool.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasQty = item.QTY_In_Stock.toString().indexOf(globalFilterInput.toLowerCase().trim())
            const hasQtyMin = item.QTY_Min.toString().indexOf(globalFilterInput.toLowerCase().trim())

            const hasMatches = (hasName + hasDescription + hasBCode + hasTool + hasQty + hasQtyMin) > -6

            arr = hasMatches ?
                [...arr, createObjForRow(item)]
                :
                [...arr]

        })
        return arr
    }

    const getUnFilteredArr = (items) => {
        let arr = []
        items.forEach(item => {
            arr = [...arr, createObjForRow(item)]
        })
        return arr
    }

    const getItemsRows = (items) => {

        return globalFilterInput ?
            [...getFilteredArr(items)]
            :
            [...getUnFilteredArr(items)]
    }


    // const getItemsRows = (items) => {
    //     console.log(items)
    //     let arr = []
    //     items.forEach(item => {
    //         const obj = {
    //             id: item.Id,
    //             name: item.Name,
    //             description: item.Description,
    //             bCode: item.Inventory_BCode,
    //             qty: item.QTY_In_Stock,
    //             qtyMin: item.QTY_Min,
    //             location: item.Location,
    //             tool: item.Tool,
    //             info: item.Id,
    //         }
    //
    //         arr.push(obj)
    //
    //     })
    //
    //     return arr
    // }


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
                renderCell: (params) => (
                    <ItemInfoModal itemId={params.value}/>
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
                {isAdmin && <ButtonGroupAddDeleteItems selectedItemsId={selectionModel} />}
            </div>
            <DataGrid

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
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );

}

export default HomeTable