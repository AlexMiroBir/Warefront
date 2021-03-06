import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import DeleteUserModal from "./del/delete-user-modal";
import AddUserModal from "./add/add-user-modal";


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




const ButtonGroupAddDeleteUsers = ({selectedUsersId}) => {
    const classes = useStyles();


    return (

        <div className={classes.root}>
            <ButtonGroup
                size="large"
                aria-label="small outlined button group">

                    <AddUserModal/>
                    <DeleteUserModal selectedUsersId={selectedUsersId}/>

            </ButtonGroup>
        </div>
    );
}

export default ButtonGroupAddDeleteUsers