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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1b5e20',
        },
        secondary: {
            main: '#b71c1c',
        },
    },
});


const ButtonGroupAddDeleteSuppliers = ({selectedItemsId}) => {
    const classes = useStyles();

    console.log(selectedItemsId)

    return (

        <div className={classes.root}>
            <ButtonGroup
                size="large"
                aria-label="small outlined button group">
                <ThemeProvider theme={theme}>
                    <AddModal/>
                    <DeleteSupplierModal selectedItemsId={selectedItemsId}/>
                </ThemeProvider>
            </ButtonGroup>
        </div>
    );
}

export default ButtonGroupAddDeleteSuppliers