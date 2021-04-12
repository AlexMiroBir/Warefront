import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import ToolInfoModal from "./tool-info-modal/tool-info-modal"
import TextField from "@material-ui/core/TextField";
import ButtonGroupAddDeleteTools from "./button-group-plus-modal/button-group";

const useStyles = makeStyles({
    buttonsDiv: {
        display: 'flex',
    }

});


const ToolsTable = () => {

    const classes = useStyles()

    const [selectionModel, setSelectionModel] = useState([]);
    const [globalFilterInput, setGlobalFilter] = useState("");


    const tools = useSelector(state => state.ToolsSlice.tools)
    const role = useSelector(state => state.AuthSlice.role)
    const isAdmin = role.toLowerCase() === "admin"



    const createObjForRow = (tool) => {

        const obj = {
            id: tool.id,
            name: tool.name,
            description: tool.description,
            info: tool.id
        }
        return obj
    }

    const getFilteredArr = (tools) => {
        let arr = []
        tools.forEach(tool => {
            const hasName = tool.name.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasDescription = tool.description.toLowerCase().indexOf(globalFilterInput.toLowerCase().trim())
            const hasMatches = (hasName + hasDescription) > -2

            arr = hasMatches ?
                [...arr, createObjForRow(tool)]
                :
                [...arr]

        })
        return arr
    }


    const getUnFilteredArr = (tools) => {
        let arr = []
        tools.forEach(tool => {
            arr = [...arr, createObjForRow(tool)]
        })
        return arr
    }


    const getToolsRows = (tools) => {

        return globalFilterInput ?
            [...getFilteredArr(tools)]
            :
            [...getUnFilteredArr(tools)]
    }


    const getToolsColumns = () => {
        const columns = [


            {
                field: 'name',
                headerName: "Name",
                description: "Name",
                flex: 0.5,
            },
            {
                field: 'description',
                headerName: "Description",
                description: "Description",
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
                renderCell: (params) => ( ///

                    <ToolInfoModal toolId={params.value}/>

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
                {isAdmin && <ButtonGroupAddDeleteTools selectedToolsId={selectionModel}/>}
            </div>
            <DataGrid
                rows={getToolsRows(tools)}
                columns={getToolsColumns()}
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


export default ToolsTable