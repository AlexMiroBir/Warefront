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
import {useHistory} from "react-router-dom";
import CancelPresentationSharpIcon from "@material-ui/icons/CancelPresentationSharp";
import SaveIcon from "@material-ui/icons/Save";
import PickUpModal from "./pick-up-modal";
import {setMessage, startLoading, stopLoading} from "../../../../redux/slices/common-slice";
import {axiosGetOrders} from "../../../../redux/async-thunks/orders-async-thunks";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '1000px',
        fontSize: '0.8rem',
        padding: 0,

    },
    paper: {
        padding: 0,
        fontSize:'2rem',
        textAlign: 'center',
       // color: theme.palette.text.secondary,
    },
    buttonsGreed: {
        display: 'flex',
        justifyContent: 'space-between',
        '& > *': {
            display: 'flex',
            margin:'0px 5px 0 5px'
        }

    }
}));

const ItemInfoModalGrid = ({itemId, closeModal}) => {


    const dispatch = useDispatch()
    const history = useHistory()
    const tools = useSelector(state => state.Tools.Tools)
    const allSuppliers = useSelector(state => state.Suppliers.Suppliers)
    const itemData = useSelector(state => state.Items.ItemData)

    const itemDataParameters = useSelector(state => state.Items.ItemData.Item_Parameters)
    const itemDataSuppliers = useSelector(state => state.Items.ItemData.Inventory_Suppliers)


    const [needUpdateItem, setNeedUpdateItem] = useState(false)
    const [Name, setNewName] = useState(itemData.Name)
    const [Description, setNewDesc] = useState(itemData.Description)
    const [Inventory_BCode, setNewBCode] = useState(itemData.Inventory_BCode)
    const [Tool, setNewTool] = useState(itemData.Tool.Name)
    const [Tool_Id, setNewTool_Id] = useState(itemData.Tool.Id)
    const [Location, setNewLocation] = useState(itemData.Location)
    const [QTY_In_Stock, setNewQty] = useState(itemData.QTY_In_Stock)
    const [QTY_Min, setNewQtyMin] = useState(itemData.QTY_Min)


    const [needUpdateParameters, setNeedUpdateParameters] = useState(false)
    const [parameters, setParameters] = useState(itemDataParameters);
    const [parametersIdForDelete, setParametersIdForDelete] = useState([])

    const [needUpdateSuppliers, setNeedUpdateSuppliers] = useState(false)
    const [suppliers, setSuppliers] = useState(itemDataSuppliers);
    const [suppliersIdForDelete, setSuppliersIdForDelete] = useState([])

    const dispatchData = (obj) => {
        dispatch(setMessage("Editing item data..."))
        dispatch(axiosEditItem(obj))
            .then(unwrapResult)
            .then(response => history.push('/home'))
            .then(response => dispatch(axiosGetItems({})))
            .then(response => dispatch(axiosGetTools({})))
            .then(response => dispatch(axiosGetSuppliers({})))
            .then(response => dispatch(axiosGetUsers({})))
            .then(response => dispatch(axiosGetOrders({})))
            .then(response => dispatch(setMessage("Item data has been edited")))
            .then(response => closeModal())
            .catch(rejectedValueOrSerializedError => {
                dispatch(setMessage(rejectedValueOrSerializedError.message))

            })
    }

    const newRow = () => {
        return {
            Id: itemData.Id,
            Name,
            Description,
            Filename: itemData.Filename,
            Filepath: itemData.Filepath,
            Inventory_BCode,
            Location,
            QTY_In_Stock,
            QTY_Min,
            Tool,
            Tool_Id: Tool_Id
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
                setNewTool_Id(tools.find(tool => tool.Name === value).Id)
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
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Edit item</Paper>
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*    <Paper className={classes.paper}>Avatar</Paper>*/}
                {/*</Grid>*/}
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
                <Grid className={classes.buttonsGreed} item xs={12}>
                    {/*<Button*/}
                    {/*    size='small'*/}
                    {/*    color="default"*/}
                    {/*    variant="contained"*/}

                    {/*    onClick={() => tempSave()}>Pick UP</Button>*/}
                    <PickUpModal itemId={itemId} closeModal={{closeModal}}/>
                    <div>
                        <Button
                            startIcon={<SaveIcon/>}
                            size='small'
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => tempSave()}>SAVE</Button>
                        <Button
                            startIcon={<CancelPresentationSharpIcon/>}
                            size='small'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => closeModal()}>CANCEL</Button>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
}


export default ItemInfoModalGrid