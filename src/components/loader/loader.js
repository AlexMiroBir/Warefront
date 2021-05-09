import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import "./loader.css"


const useStyles = makeStyles((theme) => ({
    page: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        zIndex: '888',
        backgroundColor: 'black',
        opacity: '0.5'
    },
    container: {
        display: 'flex',
        flexFlow: 'column',
        opacity:'1',
        alignItems: 'center',

    },

    label: {

        color: 'white',
        fontSize:'1.5rem'



    }

}));




const Loader = ({label}) => {

    const classes = useStyles()


    return (

        <div className={classes.page}>

            <div className={classes.container}>

                <div className="lds-facebook">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className={classes.label}>
                   {label.toUpperCase()}
                </div>

            </div>

        </div>


    )


}


export default Loader