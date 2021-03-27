import * as React from "react";
import {useState} from "react";

import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ToolInfoModal from "./tool-info-modal/tool-info-modal"
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    button: {
        //  width: '200px'
    },

});


const ToolsTable = () => {


    const [state, setState] = useState({
        isOpenModal: false,
        toolId: ''
    })


    const classes = useStyles()
    const tools = useSelector(state => state.ToolsSlice.tools)
    const history = useHistory()


    const showToolInfoModal = (toolId) => {
        console.log(`ShowInfoToolModal with Id:${toolId}`)

        setState({
            isOpenModal: true,
            toolId: toolId
        })
        console.log(`state.isOpenModal :${state.isOpenModal}`)
        console.log(`state.ToolId :${state.toolId}`)
        history.push(`/tool/${toolId}`)
    }

    const closeToolInfoModal = () => {

        setState({
            isOpenModal: false,
            toolId: state.toolId
        })
        history.push(`/tools`)

    }


    const getToolsRows = (tool) => {
        console.log(tool)
        let arr = []
        tools.forEach(tool => {
            const obj = {
                id: tool.Id,
                name: tool.Name,
                description: tool.Description,

                info: tool.Id,
            }

            arr.push(obj)

        })

        return arr
    }

    const getToolsColumns = () => {
        const columns = [

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
                renderCell: (params) => ( ///     TODO разобраться с кнопкой https://material-ui.com/components/data-grid/rendering/

                    <Button variant="outlined" onClick={() => showToolInfoModal(params.value)}>Show info</Button>

                ),
            },


        ]
        return columns
    }


    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                //    getRowId={(r) => r.DT_RowId}
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
            />
            {state.isOpenModal &&
            <ToolInfoModal toolId={state.toolId} showInfoModal={showToolInfoModal} closeInfoModal={closeToolInfoModal}
                           isOpenModal={state.isOpenModal}/>}
        </div>
    );
}


export default ToolsTable