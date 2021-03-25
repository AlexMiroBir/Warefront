import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NavTab from "../nav-tab";
import UserPanel from "../user-panel";
import HomeTable from "../tables/home-table/home-table";
import ToolsTable from "../tables/tools-table";
import SuppliersTable from "../tables/suppliers-table";
import UsersTable from "../tables/users-table";


//----------IMAGES------------
import logo from '../images/VPGlogo.jpg'
import OrdersTable from "../tables/orders-table/orders-table";





//-------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    logo: {
        width: '15%'
    },
    logoGrid: {
        display: 'flex',
        justifyContent: 'center'
    },
    userPanel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    navTab:{
        display:'flex',
        justifyContent:'center'
    }
}));

const MainPageGrid = () => {
    const classes = useStyles();



    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.logoGrid}>
                    <img className={classes.logo} src={logo} alt='logo'/>
                </Grid>
                <Grid item xs={4} className={classes.navTab}>
                    {<NavTab handleChange={handleChange} value={value}/>}
                </Grid>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4} className={classes.userPanel}>


                    <UserPanel/>


                </Grid>
                <Grid item xs={12}>


                    <>
                        <TabPanel value={value} index={0}>
                            <HomeTable/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <ToolsTable/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SuppliersTable/>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                           <UsersTable/>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                           <OrdersTable/>
                        </TabPanel>
                        {/*<TabPanel value={value} index={5}>*/}
                        {/*    Page Six*/}
                        {/*</TabPanel>*/}
                    </>


                </Grid>
            </Grid>
        </div>
    );
}


export default MainPageGrid