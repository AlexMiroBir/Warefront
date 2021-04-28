import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useSelector} from "react-redux";


const Toast=()=> {

    const globalStateMessageObj = useSelector(state=>state.Common.message)

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',

    });

    useEffect(()=>handleClick({vertical: 'top', horizontal: 'left'}),[globalStateMessageObj]);

    const {vertical, horizontal, open} = state;

    const handleClick = (newState) => () => {
        setState({open: true, ...newState});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };



    return (
        <div>
            <Snackbar


                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleClose}
                message={globalStateMessageObj.message}
                key={vertical + horizontal}
            />

        </div>
    );
}


export default Toast