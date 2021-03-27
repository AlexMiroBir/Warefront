import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ItemDataForm from "./item-data-form";
import ItemInfoModalNavTab from "./item-info-modal-nav-tab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width:'1000px',
        //maxHeight:"70vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ItemInfoModalGrid=()=> {
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
                    <ItemDataForm/>
                </Grid>
                <Grid item xs={12}>
                   <ItemInfoModalNavTab/>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>

            </Grid>
        </div>
    );
}


export default ItemInfoModalGrid