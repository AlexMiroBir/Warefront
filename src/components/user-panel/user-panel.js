import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import ToggleAvatarMenu from "./togle-avatar-menu";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import {grey} from '@material-ui/core/colors';
import {Route} from 'react-router-dom';
import ChangePasswordForm from "./change-password-form";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        maxHeight: '47,99px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: grey[200]
    },
    tab: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'end',
        maxHeight: '47,99px',
        fontSize: '1.5rem',

    },
    changePasswordTab: {
       // display: 'flex',

       // alignItems: 'baseline',
       // justifyContent: 'space-around',
        //maxHeight: '200px',
        // fontSize: '1.5rem',
        width:"400px",
       // height:"200px"

    },
    userNameBox:{
        display:'flex',
        flexFlow:'column'
    }
});


const UserPanel = () => {

    const userName = useSelector(state => state.Auth.Username)
    const classes = useStyles();


    return (

        <Paper square className={classes.root}>
<Box className={classes.userNameBox}>
                <Route path="/" >
                    <Box                           //TODO TABS заменил на BOX(избавление от варнингов)
                        className={classes.tab}    //TODO заккоменитровано(избавление от варнингов)
                        // variant="fullWidth"
                        // indicatorColor="primary"
                        // textColor="primary"
                        // aria-label="icon tabs example"
                    >
                        <Box>{userName}</Box>
                    </Box>
                </Route>
                <Route path="/change-password" exact>
                    <Box className={classes.changePasswordTab}

                    >
                        <ChangePasswordForm/>
                    </Box>
                </Route>
        </Box>
            <ToggleAvatarMenu/>
        </Paper>


    )

}


export default UserPanel