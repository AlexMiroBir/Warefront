import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {axiosGetItems,} from "../../redux/async-thunks/items-async-thunks";
import {axiosGetTools} from "../../redux/async-thunks/tools-async-thunks";
import {unwrapResult} from "@reduxjs/toolkit";
import {axiosGetSuppliers} from "../../redux/async-thunks/suppliers-async-thunks";
import {axiosGetUsers} from "../../redux/async-thunks/users-async-thunks";
import {axiosGetOrders} from "../../redux/async-thunks/orders-async-thunks";

function TabPanel(props) {
    const {children, value, index, ...other} = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={5}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "inherit",
        margin: '5px 5px 5px 41px',
        width:'451px'

    },
    linkTab:{
        minWidth: "80px !important",
        fontSize:'0.7rem'
    },
    tabs:{
        display:'flex',
        justifyContent:'center',
    }
}));

const NavTab = ({handleChange, value=0}) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const currentUserStatus=useSelector(state=>state.AuthSlice.role)
    const isNotLimited = currentUserStatus!=="LIMITED"

    const onClickHandler = (buttonName) => {
        switch (buttonName) {
            case 'home': {
                dispatch(axiosGetItems({}))
                    .then(unwrapResult)
                    .then(response => history.push('/home'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return

            }
            case 'tools': {
                dispatch(axiosGetTools({}))
                    .then(unwrapResult)
                    .then(response => history.push('/tools'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return

            }
            case 'suppliers': {
                dispatch(axiosGetSuppliers({}))
                    .then(unwrapResult)
                    .then(response => history.push('/suppliers'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return

            }
            case 'users': {
                dispatch(axiosGetUsers({}))
                    .then(unwrapResult)
                    .then(response => history.push('/users'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return

            }
            case 'orders': {
                dispatch(axiosGetOrders({}))
                    .then(unwrapResult)
                    .then(response => history.push('/orders'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return

            }
            default: {
                dispatch(axiosGetItems({}))
                    .then(unwrapResult)
                    .then(response => history.push('/home'))
                    .catch(rejectedValueOrSerializedError => {
                    })
                return
            }
        }
    }

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        className={classes.tabs}
                    >
                        <LinkTab className={classes.linkTab} label="Home" onClick={() => onClickHandler('home')}  {...a11yProps(0)} />
                        {isNotLimited &&<LinkTab className={classes.linkTab} label="Tools" onClick={() => onClickHandler('tools')}  {...a11yProps(1)} />}
                        {isNotLimited &&<LinkTab className={classes.linkTab} label="Suppliers" onClick={() => onClickHandler('suppliers')}  {...a11yProps(2)} />}
                        {isNotLimited &&<LinkTab className={classes.linkTab} label="Users" onClick={() => onClickHandler('users')} {...a11yProps(3)} />}
                        {isNotLimited &&<LinkTab className={classes.linkTab} label="Orders" onClick={() => onClickHandler('orders')}  {...a11yProps(4)} />}
                    </Tabs>
                </AppBar>
                {/*<>*/}
                {/*    <TabPanel value={value} index={0}>*/}
                {/*        Page One*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={1}>*/}
                {/*        Page Two*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={2}>*/}
                {/*        Page Three*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={3}>*/}
                {/*        Page Four*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={4}>*/}
                {/*        Page Five*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={5}>*/}
                {/*        Page Six*/}
                {/*    </TabPanel>*/}
                {/*</>*/}
            </div>
        );
    }


    export default NavTab