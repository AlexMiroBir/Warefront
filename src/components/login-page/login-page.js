import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LoginForm from "./login-form";




//----------IMAGES------------
import logo from '../images/VPGlogo.jpg'

//-------------------------------

///////////Material UI styles//////////////////

const useStyles = makeStyles((theme) => ({
    page: {
        width: '100vw',
        height: '100vh',


        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width:'15%'
    }

}));


////////////////////////////////////////////


const LoginPage = () => {

    const classes = useStyles()



    return (

        <div className={classes.page}>
            <img className={classes.logo} src={logo} alt='logo'/>
            <LoginForm/>

        </div>


    )


}


export default LoginPage