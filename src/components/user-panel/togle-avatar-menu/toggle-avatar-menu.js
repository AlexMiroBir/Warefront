import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import UserAvatar from "./avatar";
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import {axiosLogOut} from '../../../redux/async-thunks/auth-async-thunks'
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import {startLoading, stopLoading} from "../../../redux/slices/common-slice";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        zIndex:'1000'
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    menuList:{
      marginLeft:"-115px",

    },
}));

const ToggleAvatarMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        console.log(event)
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    const dispatch=useDispatch()
    const history = useHistory()

    const logOut=(event)=>{
        dispatch(startLoading("Logout..."))
        dispatch(axiosLogOut({}))
            .then(unwrapResult)
            .then(handleClose(event))
            .then(response => dispatch(stopLoading("Log out completed")))
            .then(history.push("/login"))
            .catch(rejectedValueOrSerializedError => {
                dispatch(stopLoading(rejectedValueOrSerializedError.message))
            })
    }

    const changePassword=(event)=>{

            handleClose(event);
            history.push("/change-password")


    }



    return (
        <div className={classes.root}>

            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <UserAvatar/>
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper className={classes.menuList}>
                                <ClickAwayListener  onClickAway={handleClose}>
                                    <MenuList  autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={(event)=>changePassword(event)}><VpnKeySharpIcon/>Change Password</MenuItem>
                                        <MenuItem onClick={(event)=>logOut(event)}><ExitToAppSharpIcon/>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );


}

export default ToggleAvatarMenu