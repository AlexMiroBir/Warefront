import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import { createMuiTheme, ThemeProvider, makeStyles  } from '@material-ui/core/styles';










const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
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


const ButtonGroupAddDelete=()=> {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <ButtonGroup size="large" aria-label="small outlined button group">
                <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddBoxSharpIcon />}
                >
                    Add new
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
                </ThemeProvider>
            </ButtonGroup>

        </div>

    );
}

export default ButtonGroupAddDelete