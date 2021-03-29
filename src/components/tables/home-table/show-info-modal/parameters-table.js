import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {Input} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import {addToCandidatesToUpdateParameters} from "../../../../redux/slices/items-slice"
import "./some.css" // at the request of the library, these classes are needed for icons

const ParametersTable = ({itemId,parameters, addItemParameter,delItemParameter, updateItemParameter}) => {

    const dispatch = useDispatch()
    const itemData = useSelector(state => state.ItemsSlice.itemData.data)
    //  const itemDataParameters = useSelector(state => state.ItemsSlice.itemData.parameters)


    const [data, setData] = useState([]);


    useEffect(() => {
        const arr = []
        //itemDataParameters.forEach(parameter => arr.push({
        parameters.forEach(parameter => arr.push({
            Id: parameter.Id,
            Inventory_ID: parameter.Inventory_ID,
            Parameter_Name: parameter.Parameter_Name,
            Parameter_Value: parameter.Parameter_Value
        }))
        // setData(JSON.parse(JSON.stringify(arr)))
        setData(arr)
    }, [parameters])

    console.log(`parameters:${parameters}`)

    return (
        <div className="App">

            <div style={{maxWidth: "100%", paddingTop: "12px"}}>
                <MaterialTable
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


                    ]}
                    data={data}
                    title={`${itemData.Name} ${itemData.Inventory_BCode}`}
                    options={{
                        exportButton: true
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
                                    newData.Inventory_ID = itemData
                                    //setData([...data, newData]);

                                    resolve(addItemParameter(newData))
                                }, 1000);
                            }),
                        //.then(response => addItemParameter(newData)),

                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = oldData.tableData.id;
                                    newData.Id = -1
                                    newData.Inventory_ID = itemData.Id
                                    dataUpdate[index] = newData;
                                   // setData([...dataUpdate]);

                                    resolve(updateItemParameter(dataUpdate));
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
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