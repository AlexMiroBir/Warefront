import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import DeleteToolModal from "./del/delete-tool-modal";
import AddToolModal from "./add/add-tool-modal";


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


const ButtonGroupAddDeleteTools = ({selectedToolsId}) => {
    const classes = useStyles();


    return (

        <div className={classes.root}>
            <ButtonGroup
                size="large"
                aria-label="small outlined button group">
                <ThemeProvider theme={theme}>
                    <AddToolModal/>
                    <DeleteToolModal selectedToolsId={selectedToolsId}/>
                </ThemeProvider>
            </ButtonGroup>
        </div>
    );
}

export default ButtonGroupAddDeleteTools