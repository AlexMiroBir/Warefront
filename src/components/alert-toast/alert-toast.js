import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {useSelector} from "react-redux";

const Toast=(message)=> {

    const globalStateMessageObj = useSelector(state=>state.AuthSlice.message) /// TODO здесь используется message из аутентификации, это неправильно, надо искать общий эндпоинт

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',

    });

    useEffect(()=>handleClick({vertical: 'bottom', horizontal: 'right'}),[globalStateMessageObj]);

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
                //severity={'error'}

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