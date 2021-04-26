import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import ImageModal from "./carousel/image-modal";


import {makeStyles} from "@material-ui/core/styles";
import noImage from '../../../images/no-image.png'
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
    const API_URL_SERVER = process.env.REACT_APP_API_URL;

    const classes = useStyles()

    const [selectionModel, setSelectionModel] = useState([]);
    const [globalFilterInput, setGlobalFilter] = useState("");

    const items = useSelector(state => state.Items.Items)
    // const itemData = useSelector(state => state.ItemsSlice.itemData.data)
    const status = useSelector(state => state.Auth.Status)
    const avatars = useSelector(state => state.Items.Avatars)
    const isAdmin = status.toLowerCase() === "admin"


    const createObjForRow = (item) => {
        const obj = {
            id: item.Id,
            name: item.Name,
            description: item.Description,
            bCode: item.Inventory_BCode,
            qty: item.Inventory_Status ? item.Inventory_Status.QTY_In_Stock : '',
            qtyMin: item.Inventory_Status ? item.Inventory_Status.QTY_Min : '',
            location: item.Inventory_Status ? item.Inventory_Status.Location : '',
            tool: item.Tool ? item.Tool.Name : '',
            info: item.Id,
            image: item.Id
        }
        return obj
    }


    const getFilteredArr = (items) => {
        let arr = []
        items.forEach(item => {
            const hasName =
                item.Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())

            const hasDescription =
                item.Description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())

            const hasBCode =
                item.Inventory_BCode.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())

            const hasTool = item.Tool ?
                item.Tool.Name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
                : -1

            const hasQty = item.Inventory_Status ?
                item.Inventory_Status.QTY_In_Stock.toString().indexOf(globalFilterInput.toLowerCase().trim())
                : -1

            const hasQtyMin = item.Inventory_Status ?
                item.Inventory_Status.QTY_Min.toString().indexOf(globalFilterInput.toLowerCase().trim())
                : -1

            const hasLocation = item.Inventory_Status ?
                item.Inventory_Status.Location.indexOf(globalFilterInput.toLowerCase().trim())
                : -1

            const hasMatches = (hasName + hasDescription + hasBCode + hasTool + hasQty + hasQtyMin + hasLocation) > -7

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
    const getImageLink = (id) => {
        const filename = avatars.find(avatar=>avatar.Inventory_ID===id)?.Filename
        console.log(filename)
        if(!filename){
            return noImage
        }
        return `${API_URL_SERVER}/${filename}`
    }


    const getItemsColumns = () => {

        const API_URL_SERVER = process.env.REACT_APP_API_URL;

        const columns = [
            {
                field: 'image',
                headerName: "Image",
                description: "Avatar",
                width: 100,
                filterable: false,
                sortable: false,
                disableClickEventBubbling: true,
                renderCell: (params) => ( ///     TODO разобраться с картинками  в скобках было (GridCellParams)  https://material-ui.com/components/data-grid/rendering/

                    // <img className={classes.avatar} src={monitor} onClick={()=>showImageModal()}/>
                    <ImageModal
                        itemId={params.value}
                        imgSrc={getImageLink(params.value)}/>

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
                {isAdmin && <ButtonGroupAddDeleteItems selectedItemsId={selectionModel}/>}
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