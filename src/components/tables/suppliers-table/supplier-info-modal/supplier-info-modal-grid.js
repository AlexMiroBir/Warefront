import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import SupplierDataForm from "./supplier-data-form";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width:'1000px',
        //maxHeight:"70vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
       // color: 'rgb(141, 255, 129)',
        backgroundColor: 'rgb(141, 255, 129)',
        fontWeight:"bold",
        fontSize:'1.5rem'

    },


}));

const SupplierInfoModalGrid=({supplierId, closeModal})=> {


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Edit Supplier</Paper>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                   <SupplierDataForm supplierId={supplierId} closeModal={closeModal}  />
                </Grid>

            </Grid>
        </div>
    );
}


export default SupplierInfoModalGrid