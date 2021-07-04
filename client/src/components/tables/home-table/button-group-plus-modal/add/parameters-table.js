import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {Input} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector} from "react-redux";

import "./some.css"
import {makeStyles} from "@material-ui/core/styles"; // at the request of the library, these classes are needed for icons

const useStyles = makeStyles((theme) => ({
    root: {
        padding:'0!important',
        margin:'0!important',


    },

}));


const ParametersTable = ({parameters, addItemParameter,delItemParameter}) => {

const classes = useStyles()
    const itemData = useSelector(state => state.Items.ItemData)



    const [data, setData] = useState([]);


    useEffect(() => {
        const arr = []
        if(parameters){
        parameters.forEach(parameter => arr.push({
            Id: parameter.Id,
            Inventory_ID: parameter.Inventory_ID,
            Parameter_Name: parameter.Parameter_Name,
            Parameter_Value: parameter.Parameter_Value
        }))

        setData(arr)
    }}, [parameters])



    return (
        // <div className="App" className={classes.root} >
        <div  className={classes.root} >

            <div >
                <MaterialTable
                    onKeyDown={(e) => e.stopPropagation()}
                    onKeyUp={(e) => e.stopPropagation()}
                    columns={[
                        {
                            title: "Parameter's name",
                            field: "Parameter_Name",
                            editComponent: editProps => (
                                <Input
                                    autoFocus={true}
                                    onChange={e => editProps.onChange(e.target.value)}

                                />
                            )
                        },
                        {title: "Parameter's filed", field: "Parameter_Value"},


                    ]

                    }
                    data={data}
                    title={`New parameters`}
                    options={{
                        exportButton: true,
                        search: false,
                        pageSize:3,
                        emptyRowsWhenPaging: true,
                        pageSizeOptions:[3,5,7],
                        maxBodyHeight:300,
                        rowStyle: {
                            fontSize: 15,

                        },
                        // cellStyle: {
                        //     fontSize: 10,
                        //     paddingTop:0
                        //
                        // },
                        // headerStyle: {
                        //     fontSize: 10,
                        //     paddingTop:0
                        // }

                    }}
                    icons={{
                        Add: props => <AddIcon/>,
                        Edit: props => <EditIcon/>,
                        Delete: props => <DeleteIcon/>,
                        Clear: props => <DeleteIcon/>,
                        Check: props => <CheckIcon/>,
                        Search: props => <SearchIcon/>,
                        ResetSearch: props => <DeleteIcon/>
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    newData.Id = -1
                                    newData.Inventory_ID = itemData.Id
                                    //setData([...data, newData]);

                                    resolve(addItemParameter(newData))
                                }, 1000);
                            }),


                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise((resolve, reject) => {
                        //         setTimeout(() => {
                        //             const dataUpdate = [...data];
                        //             const index = oldData.tableData.id;
                        //             newData.Id = -1
                        //             newData.Inventory_ID = itemData.Id
                        //             dataUpdate[index] = newData;
                        //            // setData([...dataUpdate]);
                        //
                        //             resolve(updateItemParameter(dataUpdate));
                        //         }, 1000);
                        //     }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                               //     const dataDelete = [...data];
                                    const index = oldData.tableData.id;

                                    resolve(delItemParameter(index));
                                }, 1000);
                            }),
                    }}
                />
            </div>
        </div>
    );
}


export default ParametersTable