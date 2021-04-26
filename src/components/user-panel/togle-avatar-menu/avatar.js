import {useSelector} from "react-redux";
//import Box from "@material-ui/core/Box";

import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange} from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        marginLeft:'10px',
    },

}));




const UserAvatar=()=> {


    const userName = useSelector(state => state.Auth.Username)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar variant="square" className={classes.square}>
                {userName && userName.substring(0, 1)}
            </Avatar>

        </div>
    );
}

export default UserAvatar