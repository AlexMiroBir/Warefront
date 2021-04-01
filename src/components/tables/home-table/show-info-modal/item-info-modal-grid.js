import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ItemDataForm from "./item-data-form";
import ItemInfoModalNavTab from "./item-info-modal-nav-tab";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosEditItem, axiosGetItems} from "../../../../redux/async-thunks/items-async-thunks";
import {axiosGetTools} from "../../../../redux/async-thunks/tools-async-thunks";
import {axiosGetSuppliers} from "../../../../redux/async-thunks/suppliers-async-thunks";
import {axiosGetUsers} from "../../../../redux/async-thunks/users-async-thunks";
import {axiosGetOrders} from "../../../../redux/async-thunks/orders-async-thunks";
import { useFormikContext } from "formik";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '1000px',
        fontSize: '0.8rem'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ItemInfoModalGrid = ({itemId , closeModal}) => {


    const formikContext = useFormikContext();///



    const dispatch = useDispatch()
    const history = useHistory()
    const tools = useSelector(state => state.ToolsSlice.tools)


    const itemDataParameters = useSelector(state => state.ItemsSlice.itemData.parameters)
    const itemDataSuppliers = useSelector(state => state.ItemsSlice.itemData.suppliers)
    const allSuppliers = useSelector(state => state.SuppliersSlice.suppliers)

    const [needUpdateItem, setNeedUpdateItem] = useState(false)
    const [newRow, setNewRow] = useState({})

    const [needUpdateParameters, setNeedUpdateParameters] = useState(false)
    const [parameters, setParameters] = useState(itemDataParameters);

    const [needUpdateSuppliers, setNeedUpdateSuppliers] = useState(false)
    const [suppliers, setSuppliers] = useState(itemDataSuppliers);


    const dispatchData = (obj) => {
        dispatch(axiosEditItem(obj))
            .then(unwrapResult)
            .then(response => history.push('/home'))
            .then(response => dispatch(axiosGetItems({})))
            .then(response => dispatch(axiosGetTools({})))
            .then(response => dispatch(axiosGetSuppliers({})))
            .then(response => dispatch(axiosGetUsers({})))
            .then(response => dispatch(axiosGetOrders({})))
            .then(response => closeModal())
            .catch(rejectedValueOrSerializedError => {
            })
    }

    const tempSave = () => {
        formikContext.handleSubmit()
        let obj = {}
        obj.Description = newRow.Description
        obj.Filename = newRow.Filename
        obj.Filepath = newRow.Filepath
        obj.Id = newRow.Id
        obj.Inventory_BCode = newRow.Inventory_BCode
        obj.Location = newRow.Location
        obj.Name = newRow.Name
        obj.QTY_In_Stock = newRow.QTY_In_Stock
        obj.QTY_Min = newRow.QTY_Min
        obj.Tool = newRow.Tool
        obj.Tool_Id = tools.find(tool => tool.Name === newRow.Tool).Id
        obj.row = newRow
        obj.needUpdateItem = needUpdateItem
        obj.needUpdateParameters = needUpdateParameters
        obj.needUpdateSuppliers = needUpdateSuppliers
        obj.parametersTable = JSON.stringify(parameters)
        obj.suppliersTable = JSON.stringify(suppliers)
        dispatchData(obj)

    }

    const updateItemMainData = (newRow) => {
        setNeedUpdateItem(true)
        setNewRow(newRow)
        console.log(newRow)
    }

    const addItemParameter = (newParameter) => {
        setNeedUpdateParameters(true)
        setParameters([...parameters, newParameter])

    }
    const delItemParameter = (index) => {
        setNeedUpdateParameters(true)
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
        setSuppliers([...suppliers.slice(0, index), ...suppliers.slice(index + 1)])
    }

    const updateItemSuppliers = (newSuppliers) => {
        console.log(JSON.stringify(newSuppliers))
        setSuppliers([...newSuppliers])
    }


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Edit item</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Avatar</Paper>
                </Grid>
                <Grid item xs={12}>
                    {/*<ItemDataForm setName={setName} setBCode={setBCode} setDescription={setDescription} setForTool={setForTool} setLocation={setLocation} setQty={setQty} setQtyMin={setQtyMin} />*/}
                    <ItemDataForm updateItemMainData={updateItemMainData}/>
                </Grid>
                <Grid item xs={12}>
                    <ItemInfoModalNavTab
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


export default ItemInfoModalGrid