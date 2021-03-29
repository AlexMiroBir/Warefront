import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ItemDataForm from "./item-data-form";
import ItemInfoModalNavTab from "./item-info-modal-nav-tab";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '1000px',
        //maxHeight:"70vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ItemInfoModalGrid = ({itemId}) => {

    // const[iD, setId] = useState('');
    // const[name, setName] = useState('');
    // const[bCode, setBCode] = useState('');
    // const[description, setDescription] = useState('');
    // const[forTool, setForTool] = useState('');
    // const[toolId, setToolId] = useState('');
    // const[fileName, setFileName] = useState('');
    // const[filePath, setFilePath] = useState('');
    // const[location, setLocation] = useState('');
    // const[qty, setQty] = useState('');
    // const[qtyMin, setQtyMin] = useState('');

    const itemDataParameters = useSelector(state => state.ItemsSlice.itemData.parameters)


    const [needUpdateItem, setNeedUpdateItem] = useState(false)
    const [newRow, setNewRow] = useState({})

    const [needUpdateParameters, setNeedUpdateParameters] = useState(false)
    const [parameters, setParameters] = useState(itemDataParameters);

    const [needUpdateSuppliers, setNeedUpdateSuppliers] = useState(false)
    const [supplier, setSupplier] = useState('');
    const [serialNumber, setSerialNUmber] = useState('');


    const updateItemMainData = (newRow) => {
        setNewRow(newRow)
        console.log(newRow)
    }

    const addItemParameter=(newParameter)=>{

        setParameters([...parameters,newParameter])

    }
    const delItemParameter=(index)=>{
        setParameters([...parameters.slice(0,index),...parameters.slice(index+1)])
    }
    const updateItemParameter=(newParameters)=>{
        setParameters([...newParameters])
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
                    <ItemInfoModalNavTab itemId={itemId} parameters={parameters} addItemParameter={addItemParameter} delItemParameter={delItemParameter} updateItemParameter={updateItemParameter}/>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>

            </Grid>
        </div>
    );
}


export default ItemInfoModalGrid