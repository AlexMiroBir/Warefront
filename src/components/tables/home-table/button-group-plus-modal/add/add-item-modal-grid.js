import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import{axiosGetItems,axiosEditItem} from "../../../../../redux/async-thunks/items-async-thunks";
import AddItemModalNavTab from "./add-item-modal-nav-tab";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {unwrapResult} from "@reduxjs/toolkit";
import AddItemForm from './add-item-form'

import {useHistory} from "react-router-dom";
import {setMessage, startLoading, stopLoading} from "../../../../../redux/slices/common-slice";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '1000px',
        fontSize: '0.8rem',
        padding: 0,

    },
    paper: {
        padding:0,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const AddItemModalGrid = ({itemId, closeModal}) => {


    const dispatch = useDispatch()
    const history = useHistory()
    const tools = useSelector(state => state.Tools.Tools)
    const allSuppliers = useSelector(state => state.Suppliers.Suppliers)
    const itemData = useSelector(state => state.Items.ItemData)

    // const itemDataParameters = useSelector(state => state.Items.ItemData.Item_Parameters)
    // const itemDataSuppliers = useSelector(state => state.Items.ItemData.Inventory_Suppliers)


    const [needUpdateItem, setNeedUpdateItem] = useState(false)
    const [Name, setNewName] = useState('')
    const [Description, setNewDesc] = useState('')
    const [Inventory_BCode, setNewBCode] = useState('')
    const [Tool, setNewTool] = useState('')
    const [Location, setNewLocation] = useState("")
    const [QTY_In_Stock, setNewQty] = useState("")
    const [QTY_Min, setNewQtyMin] = useState("")


    const [needUpdateParameters, setNeedUpdateParameters] = useState(false)
    const [parameters, setParameters] = useState("");
    const [parametersIdForDelete, setParametersIdForDelete] = useState([])

    const [needUpdateSuppliers, setNeedUpdateSuppliers] = useState(false)
    const [suppliers, setSuppliers] = useState("");
    const [suppliersIdForDelete, setSuppliersIdForDelete] = useState([])

    const dispatchData = (obj) => {
        dispatch(setMessage("Adding item..."))
        dispatch(axiosEditItem(obj))
            .then(unwrapResult)
            .then(response => history.push('/home'))
            .then(response => dispatch(axiosGetItems({})))
            .then(response => dispatch(setMessage("Item has been added")))
            .then(response => closeModal())
            .catch(rejectedValueOrSerializedError => {
                dispatch(setMessage(rejectedValueOrSerializedError.message))

            })
    }

    const newRow = () => {
        return {
            Id: -1,
            Name,
            Description,
            Filename: itemData.Filename,
            Filepath: itemData.Filepath,
            Inventory_BCode,
            Location,
            QTY_In_Stock,
            QTY_Min,
            Tool,
            Tool_Id: tools.find(tool => tool.Name === Tool).Id
        }
    }


    const tempSave = () => {

        let obj = {
            ...newRow(),
            row: newRow(),
            needUpdateItem: needUpdateItem,
            needUpdateParameters: needUpdateParameters,
            parametersIdForDelete: parametersIdForDelete,
            needUpdateSuppliers: needUpdateSuppliers,
            suppliersIdForDelete: suppliersIdForDelete,
            parametersTable: parameters,
            suppliersTable: suppliers
        }
        dispatchData(obj)
    }


    const updateItemMainData = (itemFieldName, value) => {

        setNeedUpdateItem(true)
        switch (itemFieldName) {
            case 'Name':
                setNewName(value)
                break;
            case 'Description':
                setNewDesc(value)
                break;
            case 'Tool':
                setNewTool(value)
                break;
            case 'BCode':
                setNewBCode(value)
                break;
            case 'Location':
                setNewLocation(value)
                break;
            case 'QTY':
                setNewQty(value)
                break;
            case 'QTY_MIN':
                setNewQtyMin(value)
                break;
            default:
                break;
        }

    }


    const addItemParameter = (newParameter) => {
        setNeedUpdateParameters(true)
        setParameters([...parameters, newParameter])

    }
    const delItemParameter = (index) => {
        setNeedUpdateParameters(true)
        setParametersIdForDelete([...parametersIdForDelete, parameters[index].Id])
        setParameters([...parameters.slice(0, index), ...parameters.slice(index + 1)])
    }

    const updateItemParameter = (newParameters) => {
        setParameters([...newParameters])
    }

    const addItemSupplier = (newSupplier) => {
        setNeedUpdateSuppliers(true)
        try {
            const supplier = allSuppliers.find(supp => supp.Name === newSupplier.supplier)
            newSupplier.Supplier_ID = supplier.Id
            newSupplier.Supplier_SN = newSupplier.serial_number
            setSuppliers([...suppliers, newSupplier])
        } catch (e) {
            window.alert("suppler with such name doesn't exist")    /// TODO сделать норм ошибку

        }

    }
    const delItemSupplier = (index) => {
        setNeedUpdateSuppliers(true)
        setSuppliersIdForDelete([...suppliersIdForDelete, suppliers[index].Id])
        setSuppliers([...suppliers.slice(0, index), ...suppliers.slice(index + 1)])
    }

    const updateItemSuppliers = (newSuppliers) => {
        console.log(JSON.stringify(newSuppliers))
        setSuppliers([...newSuppliers])
    }


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Edit item</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Avatar</Paper>
                </Grid>
                <Grid item xs={12} >
                    {/*<ItemDataForm setName={setName} setBCode={setBCode} setDescription={setDescription} setForTool={setForTool} setLocation={setLocation} setQty={setQty} setQtyMin={setQtyMin} />*/}
                    <AddItemForm
                        updateItemMainData={updateItemMainData}
                        Name={Name}
                        Description


                    />
                </Grid>
                <Grid item xs={12}>
                    <AddItemModalNavTab
                        itemId={itemId}
                        // Parameters
                        parameters={parameters}
                        addItemParameter={addItemParameter}
                        delItemParameter={delItemParameter}
                        updateItemParameter={updateItemParameter}

                        // Suppliers
                        suppliers={suppliers}
                        addItemSupplier={addItemSupplier}
                        delItemSupplier={delItemSupplier}
                        updateItemSuppliers={updateItemSuppliers}


                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => tempSave()}>SAVE</Button>
                </Grid>

            </Grid>
        </div>
    );
}


export default AddItemModalGrid