import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import DeleteSupplierModal from "./del/delete-supplier-modal";
import AddModal from "./add/add-supplier-modal";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
        marginLeft: 'auto'
    },
}));




const ButtonGroupAddDeleteSuppliers = ({selectedSuppliersId}) => {
    const classes = useStyles();



    return (

        <div className={classes.root}>
            <ButtonGroup
                size="large"
                aria-label="small outlined button group">

                    <AddModal/>
                    <DeleteSupplierModal selectedSuppliersId={selectedSuppliersId}/>

            </ButtonGroup>
        </div>
    );
}

export default ButtonGroupAddDeleteSuppliers