import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LoginForm from "./login-form";

//----------LOGO------------
import logo from '../images/WH.png'
//-------------------------------


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
       width:'25%',
        marginLeft:'-4%'
    }

}));



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