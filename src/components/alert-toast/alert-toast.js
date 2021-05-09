import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Collapse from '@material-ui/core/Collapse';

const ToastInside=()=> {
    const { enqueueSnackbar } = useSnackbar();

    const globalStateMessageObj = useSelector(state=>state.Common.message)
    const variant = globalStateMessageObj.variant
    const msg = globalStateMessageObj.msg

    console.log(globalStateMessageObj)


    useEffect(()=>setTimeout(handleClickVariant(msg, variant),500),[globalStateMessageObj]);



    const handleClick = () => {
        enqueueSnackbar(msg);
    };

    const handleClickVariant = (msg,variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(msg, {variant});
    };

    return (
        <React.Fragment>
        </React.Fragment>
    );
}



const Toast=()=> {


    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            TransitionComponent={Collapse}
        >
            <ToastInside />
        </SnackbarProvider>
    );
}

export default Toast